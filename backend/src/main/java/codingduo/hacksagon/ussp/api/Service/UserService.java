package codingduo.hacksagon.ussp.api.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import codingduo.hacksagon.ussp.api.DTO.TokenDTO;
import codingduo.hacksagon.ussp.api.DTO.UserDTO;
import codingduo.hacksagon.ussp.api.Exception.AuthorizationFailureException;
import codingduo.hacksagon.ussp.api.Exception.GeneralException;
import codingduo.hacksagon.ussp.api.Model.RefreshToken;
import codingduo.hacksagon.ussp.api.Model.UserData;
import codingduo.hacksagon.ussp.api.Model.Users;
import codingduo.hacksagon.ussp.api.Repo.RefreshTokenRepo;
import codingduo.hacksagon.ussp.api.Repo.UserRepo;
import codingduo.hacksagon.ussp.api.Standards.Time;

@Service
public class UserService implements UserDetailsService {
    private final UserRepo db;
    private final RefreshTokenService rtService;
    private final RefreshTokenRepo db2;
    private final JWTService jwtService;
    private final ApplicationContext context;

    @Autowired
    public UserService(UserRepo db,
            RefreshTokenService rtService,
            RefreshTokenRepo db2,
            JWTService jwtService,
            ApplicationContext context) { 
        this.db = db;
        this.rtService = rtService;
        this.db2 = db2;
        this.jwtService = jwtService;
        this.context = context;
    }

    public HttpStatus register(Users user) throws GeneralException {
        if (db.findByEmail(user.getEmail()) != null)
            throw new GeneralException("409:Email already exists");
        BCryptPasswordEncoder encoder = context.getBean(BCryptPasswordEncoder.class);
        user.setPassword(encoder.encode(user.getPassword()));
        user.setCreatedAt(Time.now());
        user.setLastLogin(Time.now());
        db.save(user);
        return HttpStatus.CREATED;
    }

    public TokenDTO login(UserDTO dto) throws AuthorizationFailureException {
        AuthenticationManager manager = context.getBean(AuthenticationManager.class);
        Authentication auth = manager
                .authenticate(new UsernamePasswordAuthenticationToken(dto.email(), dto.password()));
        if (!auth.isAuthenticated())
            throw new AuthorizationFailureException("Incorrect email or password");
        Users user = db.findByEmail(dto.email());
        user.setLastLogin(Time.now());
        db.save(user);
        return generateToken(user.getEmail(), user.getId(),user.getRole());
    }

    private TokenDTO generateToken(String username, int id,String role) {
        String accessToken = jwtService.generateToken(username);
        String refreshToken = rtService.generateToken(username);
        db2.save(new RefreshToken(id, refreshToken));
        return new TokenDTO(accessToken, refreshToken,role);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = db.findByEmail(email);
        if (user == null)
            throw new UsernameNotFoundException("Email No registered");
        return new UserData(user);
    }

    public TokenDTO refresh(String refreshToken) throws AuthorizationFailureException {
        RefreshToken token = db2.findByToken(refreshToken);
        if (token == null || rtService.isTokenExpired(refreshToken))
            throw new AuthorizationFailureException("Invalid Token");
        Users user = db.findById(token.getUserId()).get();
        if (user == null || !user.getEmail().equals(rtService.extractUserName(refreshToken)))
            throw new AuthorizationFailureException("Invalid User");
        return generateToken(user.getEmail(), user.getId(),user.getRole());
    }

    public void endSession(UserDetails usd) throws AuthorizationFailureException {
        Users user = db.findByEmail(usd.getUsername());
        if (user == null)
            throw new AuthorizationFailureException("Invalid User");
        db2.deleteById(user.getId());
    }
}
