import { Stack } from "expo-router";
import { TouchableOpacity, Text, Platform } from "react-native";
import { useRouter } from "expo-router";

// Import only if available (avoids SSR crash)
let signOutFn: any = null;
let authObj: any = null;
let ToastObj: any = null;

if (Platform.OS !== "web") {
  const { signOut } = require("firebase/auth");
  const { auth } = require("../../config/firebase");
  const Toast = require("react-native-toast-message").default;

  signOutFn = signOut;
  authObj = auth;
  ToastObj = Toast;
}

export default function AppLayout() {
  const router = useRouter();

  const handleLogout = async () => {
    if (Platform.OS === "web") return; // Skip on web (SSR-safe)

    try {
      await signOutFn(authObj);

      ToastObj.show({
        type: "success",
        text1: "Logged out successfully!",
        position: "top",
      });

      router.replace("/");
    } catch (error) {
      console.log("Logout error:", error);

      ToastObj.show({
        type: "error",
        text1: "Log out error!",
        position: "top",
      });
    }
  };

  return (
    <Stack
      screenOptions={{
        headerRight: () =>
          Platform.OS !== "web" && (
            <TouchableOpacity
              onPress={handleLogout}
              style={{ marginRight: 15 }}
            >
              <Text style={{ color: "#e74c3c", fontWeight: "bold" }}>
                Logout
              </Text>
            </TouchableOpacity>
          ),
      }}
    >
      <Stack.Screen
        name="notes"
        options={{
          title: "My Notes",
        }}
      />
    </Stack>
  );
}
