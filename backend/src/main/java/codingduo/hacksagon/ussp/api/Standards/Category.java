package codingduo.hacksagon.ussp.api.Standards;

import java.util.Set;

public class Category {
    public static final Set<String> GRIEVANCE_CATEGORIES = Set.of(
        "ACADEMIC_ISSUES",//8
        "FACILITY_MAINTENANCE",//8
        "FINANCIAL_DISPUTE",
        "HARASSMENT_OR_BULLYING",
        "TECHNICAL_SUPPORT",//8
        "ADMINISTRATIVE_DELAY",
        "HOSTEL_MANAGEMENT",//8
        "OTHER"
    );
    public static final Set<String> NOTICE_CATEGORIES = Set.of(
        "ACADEMIC",
        "HOSTEL",
        "GENERAL"
    );
    public static final Set<String> RESOURCE_CATEGORIES = Set.of(
        "SYLLABUS",
        "NOTES",
        "PREVIOUS_PAPERS",
        "LAB",
        "ACADEMIC",
        "BOOKS"
    );
}
