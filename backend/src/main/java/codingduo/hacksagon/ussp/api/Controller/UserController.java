package codingduo.hacksagon.ussp.api.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codingduo.hacksagon.ussp.api.DTO.TokenDTO;
import codingduo.hacksagon.ussp.api.DTO.UserDTO;
import codingduo.hacksagon.ussp.api.Exception.AuthorizationFailureException;
import codingduo.hacksagon.ussp.api.Exception.GeneralException;
import codingduo.hacksagon.ussp.api.Model.UserData;
import codingduo.hacksagon.ussp.api.Model.Users;
import codingduo.hacksagon.ussp.api.Service.UserService;
import codingduo.hacksagon.ussp.api.Standards.Role;
@RestController
@RequestMapping("/user")
public class UserController {
    private UserService service;
    @Autowired
    public UserController(UserService service){
        this.service=service;
    }
    @PostMapping("/register")
    public ResponseEntity<TokenDTO> registerUser(@AuthenticationPrincipal UserData details, @RequestBody Users user) throws GeneralException{
        if(!details.getRole().equals(Role.ADMIN)) throw new GeneralException("401:Not authorized for this endpoint");
        return new ResponseEntity<>(service.register(user));
    }
    @PostMapping("/login")
    public ResponseEntity<TokenDTO> loginUser(@RequestBody UserDTO user) throws AuthorizationFailureException{
        return new ResponseEntity<>(service.login(user),HttpStatus.OK);
    }
    @PostMapping("/refresh")
    public ResponseEntity<TokenDTO> refreshUser(@RequestHeader(value = "refresh-token",required = false) String refreshToken) throws AuthorizationFailureException{
        return new ResponseEntity<>(service.refresh(refreshToken),HttpStatus.OK);
    }
    @PostMapping("/logout")
    public ResponseEntity<TokenDTO> logoutUser(@AuthenticationPrincipal UserDetails uds) throws AuthorizationFailureException{
        service.endSession(uds);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
