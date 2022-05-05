import React, { useEffect, useState } from "react";
import { Text, View, Button, ScrollView } from "react-native";
import { Base, Typography } from "../../styles";
import Invoice from "../../interfaces/Invoice";
import invoicesModel from "../../models/invoices";
import { DataTable } from "react-native-paper";

const InvoicesList = ({ route, navigation }) => {
  const { reload } = route.params || false;
  const [invoices, setInvoices] = useState<Array<Partial<Invoice>>>([]);

  const fetchAllInvoices = async () => {
    setInvoices(await invoicesModel.getInvoices());
  };

  if (reload) {
    console.log("reloading invoices");
    fetchAllInvoices();
    route.params.reload = false;
  }

  useEffect(() => {
    fetchAllInvoices();
  }, []);

  const table = invoices.map((invoice) => {
    return (
      <DataTable.Row key={invoice.id}>
        <DataTable.Cell>{invoice.name}</DataTable.Cell>
        <DataTable.Cell numeric>{invoice.total_price}</DataTable.Cell>
        <DataTable.Cell> {invoice.due_date}</DataTable.Cell>
      </DataTable.Row>
    );
  });
  // const listOfInvoices = invoices.map((invoice) => (
  //   <Text key={invoice.id} style={Typography.padding}>
  //     <Text style={Typography.boldText}>{invoice.id},</Text>
  //     <Text> levererade: {invoice.total_price}</Text>
  //     <Text> kommentar: {invoice.due_date}</Text>
  //     <Text> kommentar: {invoice.name}</Text>
  //   </Text>
  // ));

  // return (
  //   <DataTable>
  //     <DataTable.Header>
  //       <DataTable.Title>Animal</DataTable.Title>
  //       <DataTable.Title numeric># of legs</DataTable.Title>
  //       <DataTable.Title>Color</DataTable.Title>
  //     </DataTable.Header>
  //     {table}
  //   </DataTable>
  // );
  return (
    <ScrollView style={Base.base}>
      <Text style={Typography.header2}>Fakturor</Text>
      {table.length > 0 ? (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Namn</DataTable.Title>
            <DataTable.Title numeric>Totalpris</DataTable.Title>
            <DataTable.Title> Förfallodatum</DataTable.Title>
          </DataTable.Header>
          {table}
        </DataTable>
      ) : (
        <Text>Inga fakturor</Text>
      )}
      <Button
        title="Skapa ny faktura"
        onPress={() => {
          navigation.navigate("Form");
        }}
      />
    </ScrollView>
  );
};

export default InvoicesList;
