import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
    const router = useRouter();
    const [name, setName] = useState("reorder-three-outline");
    const [nav, setNav] = useState(false);
    const handlenav = () => {
        setNav(!nav);
        if (!nav) {
            setName("close-outline")
        } else {
            setName("reorder-three-outline");
        }

    }
    return (
        <View style={{ flex: 1, backgroundColor: "white", position: "relative" }}>
            <View style={{ width: "100%", height: 100, paddingTop: 20, display: "flex", flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "lightgray" }}>
                <Ionicons name="book-outline" color={"black"} size={24} style={{ fontWeight: 600, paddingLeft: 26, paddingTop: 5 }} />
                <Text style={{ fontSize: 24, fontWeight: 600, paddingLeft: 10 }}>LiteraSocial</Text>
                <Ionicons onPress={handlenav} name={name} size={24} color={"black"} style={{ paddingTop: 5, position: "absolute", top: 45, right: 20 }} />
            </View>
            <View style={{ width: "100%", display: "flex", alignItems: 'center' }}>

            </View>
            <View style={{ width: "100%", height: 80, bottom: 0, position: "absolute", zIndex: 10000000, backgroundColor: "white", borderTopWidth: 1, borderTopColor: "lightgray", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", }}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => router.push("/(tabs)/mainpage")} style={{ width: "19%", height: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                    <Ionicons name="home-outline" size={22} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => router.push("/(tabs)/Thoughts")} style={{ width: "19%", height: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                    <Ionicons name="chatbox-outline" size={22} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => router.push("/(tabs)/Search")} style={{ width: "19%", height: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                    <Ionicons name="search-outline" size={22} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => router.push("/(tabs)/Ai")} style={{ width: "19%", height: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                    <Ionicons name="person-outline" size={22} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => router.push("/(tabs)/Profile")} style={{ width: "19%", height: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                    <Ionicons name="person-circle" size={22} color={"black"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}