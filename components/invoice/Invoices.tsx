import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InvoiceForm from "./InvoiceForm";
import InvoicesList from "./InvoicesList";

const Stack = createNativeStackNavigator();

const Invoices = () => {
  return (
    <Stack.Navigator initialRouteName="list">
      <Stack.Screen name="ListOfInvoices" component={InvoicesList} />
      <Stack.Screen name="Form" component={InvoiceForm} />
    </Stack.Navigator>
  );
};

export default Invoices;
