interface Address {
  street: string;
  city: string;
}
const nominatim = {
  getCoordinates: async (address: Address) => {
    const urlEncodedAddress = encodeURIComponent(
      `${address.street}, ${address.city}`
    );
    const url =
      "https://nominatim.openstreetmap.org/search.php?format=jsonv2&q=";
    const result = await (await fetch(`${url}${urlEncodedAddress}`)).json();
    return result;
  },
};

export default nominatim;
