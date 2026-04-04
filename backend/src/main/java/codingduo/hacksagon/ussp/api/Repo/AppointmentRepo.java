package codingduo.hacksagon.ussp.api.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import codingduo.hacksagon.ussp.api.Model.Appointment;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepo extends JpaRepository<Appointment, Long> {
    
    // This matches the call in your Controller's getAvailableSlots method
    List<Appointment> findByCounselorIdAndAppointmentDate(int counselorId, LocalDate appointmentDate);

    List<Appointment> findByStudentId(int userId);
}