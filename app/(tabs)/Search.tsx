import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Search() {
    const router = useRouter();
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ width: "100%", height: 80, bottom: 0, position: "absolute", zIndex: 10000000, backgroundColor: "white", borderTopWidth: 1, borderTopColor: "lightgray", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: "13%" }}>
                <Ionicons onPress={() => router.push("/(tabs)/mainpage")} name="home-outline" size={22} color={"black"} />
                <Ionicons onPress={() => router.push("/(tabs)/Thoughts")} name="chatbox-outline" size={22} color={"black"} />
                <Ionicons onPress={() => router.push("/(tabs)/Search")} name="search" size={22} color={"black"} />
                <Ionicons onPress={() => router.push("/(tabs)/Ai")} name="person-outline" size={22} color={"black"} />
                <Ionicons onPress={() => router.push("/(tabs)/Profile")} name="person-circle-outline" size={22} color={"black"} />
            </View>
        </View>
    )

}