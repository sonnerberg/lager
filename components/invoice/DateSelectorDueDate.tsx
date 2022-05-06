import { useEffect, useState } from "react";
import { Button, Platform, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateSelectorDueDate = ({ setInvoice, invoice }) => {
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
        <Button
          onPress={showDatePicker}
          title="Visa datumväljare (förfallodatum)"
        />
      )}
      {(show || Platform.OS === "ios") && (
        <DateTimePicker
          onChange={(_, date: Date | undefined) => {
            setShow(false);
            setDropDownDate(date);

            setInvoice({
              ...invoice,
              due_date: date?.toLocaleDateString("se"),
            });
          }}
          value={dropDownDate ? dropDownDate : new Date()}
        />
      )}
    </View>
  );
};

export default DateSelectorDueDate;
