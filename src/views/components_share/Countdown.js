import React from "react";
import "../../styles/global.scss"; // Đảm bảo đường dẫn đúng đến file CSS
class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  componentDidMount() {
    this.Countdowndate = new Date("2025-10-31T23:59:59").getTime();
    this.interval = setInterval(this.updateCountdown, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateCountdown = () => {
    const now = new Date().getTime();
    const distance = this.Countdowndate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.setState({ days, hours, minutes, seconds });
  };

  render() {
    const { days, hours, minutes, seconds } = this.state;
    return (
      <div className="countdown-box d-flex gap-3">
        <div className="timefont">
          <span>{days}</span>
          <br />
          <small>Ngày</small>
        </div>
        <div className="timefont">
          <span>{hours}</span>
          <br />
          <small>Giờ</small>
        </div>
        <div className="timefont">
          <span>{minutes}</span>
          <br />
          <small>Phút</small>
        </div>
        <div className="timefont">
          <span>{seconds}</span>
          <br />
          <small>Giây</small>
        </div>
      </div>
    );
  }
}

export default Countdown;
