import { useEffect, useState } from "react";
import { Button, Platform, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Delivery from "../../interfaces/Delivery";

interface Props {
  delivery: Partial<Delivery>;
  setDelivery: React.Dispatch<React.SetStateAction<Partial<Delivery>>>;
}
const DateDropDown = ({ setDelivery, delivery }: Props) => {
  const [dropDownDate, setDropDownDate] = useState<Date | undefined>(
    new Date()
  );
  const [show, setShow] = useState<Boolean>(false);

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View>
      {Platform.OS === "android" && (
        <Button onPress={showDatePicker} title="Visa datumväljare" />
      )}
      {(show || Platform.OS === "ios") && (
        <DateTimePicker
          onChange={(_, date: Date | undefined) => {
            setShow(false);
            setDropDownDate(date);

            setDelivery({
              ...delivery,
              delivery_date: date?.toLocaleDateString("se"),
            });
          }}
          value={dropDownDate ? dropDownDate : new Date()}
        />
      )}
    </View>
  );
};

export default DateDropDown;
