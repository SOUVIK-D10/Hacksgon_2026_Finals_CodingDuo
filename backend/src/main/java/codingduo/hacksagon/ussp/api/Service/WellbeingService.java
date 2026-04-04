package codingduo.hacksagon.ussp.api.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codingduo.hacksagon.ussp.api.DTO.SlotResponse;
import codingduo.hacksagon.ussp.api.Model.Appointment;
import codingduo.hacksagon.ussp.api.Repo.AppointmentRepo;
import codingduo.hacksagon.ussp.api.Standards.CounselorData;






@Service
public class WellbeingService {
    private EmailService service;
    private AppointmentRepo appointmentRepository;
    @Autowired
    public WellbeingService(EmailService service,AppointmentRepo appointmentRepository){
        this.service=service;
        this.appointmentRepository=appointmentRepository;
    }
    public void sendAlart(int userId, String latitude, String longitude) {
        String googleMapsLink = "https://www.google.com/maps?q=" + latitude + "," + longitude;
        String emailBody = String.format("!!!EMERGENCY ALERT TRIGGERED!!!\n\nStudent having id : %d\nis currently at\nLOCATION : %s\n\nNEED help.",userId,googleMapsLink);
        service.sendMail("atherline01@gmail.com","URGENT SOS ALERT",emailBody);
    }
    public List<SlotResponse> getSlots(int counselorId, LocalDate date){
        List<Appointment> bookedAppointments = appointmentRepository
            .findByCounselorIdAndAppointmentDate(counselorId, date);

        List<String> bookedTimes = bookedAppointments.stream()
                .map(Appointment::getAppointmentTime)
                .collect(Collectors.toList());

        List<SlotResponse> response = CounselorData.DAILY_SLOTS.stream()
                .map(time -> new SlotResponse(time, bookedTimes.contains(time)))
                .collect(Collectors.toList());
        return response;
    }
}
