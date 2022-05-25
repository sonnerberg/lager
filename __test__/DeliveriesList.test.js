import { render } from "@testing-library/react-native";
import DeliveriesList from "../components/delivery/DeliveriesList";

const setProducts = () => false;

test('header should exist containing the text "Inleveranser"', async () => {
    const { getByText } = render(
        <DeliveriesList route={{}} navigation={{}} setProducts={setProducts} />
    );

    const header = await getByText("Inleveranser");

    expect(header).toBeDefined();
});
