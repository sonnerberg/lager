// TODO: Update FlashMessageInterface with all types
interface FlashMessageInterface {
  message: string;
  description?: string;
  type: "default" | "danger" | "success" | "info" | "none" | "warning";
}

export default FlashMessageInterface;
