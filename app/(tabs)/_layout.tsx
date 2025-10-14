import { Stack } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function AppLayout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Toast.show({
        type: "success",
        text1: "Logged out successfully!",
        position: "top",
      });
      router.replace("/");
      console.log("Logged out successfully!");
    } catch (error) {
      console.log("Logout error:", error);
      Toast.show({
        type: "error",
        text1: "Log out error!",
        position: "top",
      });
    }
  };

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
            <Text style={{ color: "#e74c3c", fontWeight: "bold" }}>Logout</Text>
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
