import { useEffect, useState } from "react";
import { Button, Platform, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateDropDown = ({ setDelivery, delivery }) => {
  const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
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
            if (date) {
              setDropDownDate(date);

              setDelivery({
                ...delivery,
                delivery_date: date.toLocaleDateString("se"),
              });
            }

            setShow(false);
          }}
          value={dropDownDate}
        />
      )}
    </View>
  );
};

export default DateDropDown;
