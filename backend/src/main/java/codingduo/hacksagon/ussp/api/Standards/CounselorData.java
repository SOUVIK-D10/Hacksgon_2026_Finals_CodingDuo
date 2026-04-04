package codingduo.hacksagon.ussp.api.Standards;

import java.util.Arrays;
import java.util.List;

public class CounselorData {

    public static final String[][] COUNSELORS = {
        {}, // Index 0: Blank
        {"Dr. Anita Sharma", "Stress & Anxiety Management"},           // Index 1
        {"Dr. Rajesh Kumar", "Academic Pressure & Career Counseling"}, // Index 2
        {"Ms. Priya Singh", "General Well-being & Adjustment"}          // Index 3
    };
    public static final List<String> DAILY_SLOTS = Arrays.asList(
        "09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"
    );
}
