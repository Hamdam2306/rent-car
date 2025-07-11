import BillingForm from "../../components/booking/booking-form"
import PaymentForm from "../../components/booking/paymentForm"
import RentalInfoForm from "../../components/booking/rentalInfoForm"

const Home =() => {
    return(
        <div className="w-full">
          <BillingForm/>
          <RentalInfoForm/>
          <PaymentForm/>
        </div>
    )
}

export default Home