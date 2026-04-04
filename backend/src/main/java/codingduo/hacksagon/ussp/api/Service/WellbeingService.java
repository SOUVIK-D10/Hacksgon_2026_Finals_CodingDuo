package codingduo.hacksagon.ussp.api.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import codingduo.hacksagon.ussp.api.DTO.AppointmentResponseDTO;
import codingduo.hacksagon.ussp.api.DTO.SlotResponse;
import codingduo.hacksagon.ussp.api.Exception.GeneralException;
import codingduo.hacksagon.ussp.api.Model.Appointment;
import codingduo.hacksagon.ussp.api.Model.BookingRequest;
import codingduo.hacksagon.ussp.api.Repo.AppointmentRepo;
import codingduo.hacksagon.ussp.api.Standards.CounselorData;

@Service
public class WellbeingService {
    private EmailService service;
    private AppointmentRepo appointmentRepository;
    private JitsiService jitsiService;

    @Autowired
    public WellbeingService(EmailService service, AppointmentRepo appointmentRepository, JitsiService jitsiServicey) {
        this.service = service;
        this.appointmentRepository = appointmentRepository;
        this.jitsiService = jitsiServicey;
    }

    public void sendAlart(int userId, String latitude, String longitude) {
        String googleMapsLink = "https://www.google.com/maps?q=" + latitude + "," + longitude;
        String emailBody = String.format(
                "!!!EMERGENCY ALERT TRIGGERED!!!\n\nStudent having id : %d\nis currently at\nLOCATION : %s\n\nNEED help.",
                userId, googleMapsLink);
        service.sendMail("atherline01@gmail.com", "URGENT SOS ALERT", emailBody);
    }

    public List<SlotResponse> getSlots(int counselorId, LocalDate date) {
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

    public Map<String, String> bookSlot(int userId, BookingRequest request) throws GeneralException {
        try {
            Appointment newAppointment = new Appointment();
            String meetLink = jitsiService.createMeeting("Counseling-Session");
            newAppointment.setStudentId(userId);
            newAppointment.setCounselorId(request.getCounselorId());
            newAppointment.setAppointmentDate(request.getPreferredDate());
            newAppointment.setAppointmentTime(request.getPreferredTime());
            newAppointment.setCategory(request.getCategory());
            newAppointment.setNotes(request.getNotes());
            newAppointment.setStatus("CONFIRMED");
            newAppointment.setMeetLink(meetLink);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Appointment booked successfully!");
            int cId = request.getCounselorId().intValue();
            String counselorName = (cId < CounselorData.COUNSELORS.length) ? CounselorData.COUNSELORS[cId][0]
                    : "Counselor";
            String emailBody = "NEW APPOINTMENT CONFIRMED\n\n" +
                    "Counselor: " + counselorName + "\n" +
                    "Student ID: " + userId + "\n" +
                    "Date: " + request.getPreferredDate() + "\n" +
                    "Time: " + request.getPreferredTime() + "\n" +
                    "Category: " + request.getCategory() + "\n\n" +
                    "Student Notes: " + (request.getNotes() != null ? request.getNotes() : "No notes provided.")
                    + "\n\n" +
                    "Meeting Link: " + meetLink;
            service.sendMail("atherline01@gmail.com", "New Appointment Booking", emailBody);
            appointmentRepository.save(newAppointment);
            return response;

        } catch (DataIntegrityViolationException e) {
            throw new GeneralException("409:Slot Already Booked");
        } catch (Exception e) {
            throw new GeneralException("500:Facing issue during booking, please try again later");
        }
    }

    public List<AppointmentResponseDTO> history(int userId) {
        List<Appointment> appointments = appointmentRepository.findByStudentId(userId);
        List<AppointmentResponseDTO> dto = new ArrayList<>();
        for (Appointment a : appointments) {
            dto.add(new AppointmentResponseDTO(a.getId(), CounselorData.COUNSELORS[a.getCounselorId().intValue()][0],
                    CounselorData.COUNSELORS[a.getCounselorId().intValue()][1], a.getAppointmentDate(),
                    a.getAppointmentTime(), a.getCategory(), a.getStatus(),a.getMeetLink()));
        }
        return dto;
    }
}
