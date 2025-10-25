import { Toaster } from "react-hot-toast";

const ReactHotToast = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toasterId="default"
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        removeDelay: 1000,
        style: {
          fontSize: "1.6rem",
          maxWidth: "50rem",
          padding: "1.6rem 2.4rem",

          background: "var(--color-gray-50)",
          color: "var(--color-gray-700)",
        },

        // Default options for specific types
        success: {
          duration: 3000,
          iconTheme: {
            primary: "green",
            secondary: "black",
          },
        },
      }}
    />
  );
};

export default ReactHotToast;
