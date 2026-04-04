package codingduo.hacksagon.ussp.api.DTO;

public class SlotResponse {
    private String time;
    private boolean isBooked;

    public SlotResponse(String time, boolean isBooked) {
        this.time = time;
        this.isBooked = isBooked;
    }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public boolean getIsBooked() { return isBooked; }
    public void setIsBooked(boolean isBooked) { this.isBooked = isBooked; }
}