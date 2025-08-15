import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

export default function Search() {
    const router = useRouter();
    const [option, setOption] = useState("l");
    const [data, setData] = useState(['']);
    return (
        <View style={{ flex: 1, backgroundColor: "white", display: "flex", alignItems: 'center', paddingTop: 50 }}>
            <TextInput style={{ width: "80%", height: 50, borderWidth: 1, borderColor: "black", borderRadius: 20, padding: 10, paddingLeft: 15, paddingRight: 15 }} placeholder="Search for Poems, stories, users..." />
            <Pressable style={{ display: "flex", alignItems: 'center', flexDirection: 'row', width: "100%", justifyContent: "center", paddingTop: 30, gap: "15%" }}>
                <Pressable onPress={() => setOption("l")} style={{ padding: 21, backgroundColor: option == "l"?"black":"white",borderWidth: 1, borderColor: option == "l"?"white":"black" ,borderRadius: 10 }}><Text style={{ color: option == "l"?"white":"black" }}>Literature</Text></Pressable>
                <Pressable onPress={() => setOption("a")} style={{ padding: 20, backgroundColor: option == "a"?"black":"white" ,borderWidth: 1, borderColor: "black", borderRadius: 10 }}><Text style={{ color: option == "a"?"white":"black" }}>Accounts</Text></Pressable>
            </Pressable>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={{display:'flex',alignItems:'center'}}>
                        <Pressable style={{ minWidth: "85%", maxWidth: "85%", width: "110%", borderWidth: 1, borderColor: 'lightgray', display: "flex", alignItems: 'center', borderRadius: 10, marginTop: 20 }}>
                            <View style={{ position: "absolute", left: 10, width: "100%", padding: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", }}>
                                <Text style={{ padding: 15, borderRadius: 40, backgroundColor: "lightgray", color: "lightgray" }}>JR</Text>
                                <View style={{ display: 'flex', flexDirection: "column", alignItems: 'flex-start', padding: 10, gap: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 500, textAlign: "left", backgroundColor: "lightgray", borderRadius: 20, color: "lightgray" }}>VoiceOfYouth</Text>
                                    <Text style={{ fontSize: 12, color: "lightgray", padding: 0, backgroundColor: "lightgray", borderRadius: 20 }}>user112</Text>
                                </View>
                                <Ionicons name="ellipsis-horizontal-outline" size={20} color={"lightgray"} style={{ position: "absolute", right: 30, zIndex: 1000000000, backgroundColor: "lightgray" }} />
                            </View>
                            <View style={{ paddingTop: 90, width: "100%", display: "flex", alignItems: 'center', justifyContent: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: "lightgray", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                                <Text style={{ textAlign: "left", fontSize: 8, fontWeight: 500, lineHeight: 25, padding: 10, backgroundColor: "lightgray", borderRadius: 50, color: "lightgray" }}>The student protests spreading across campuses aren't just about tuition hikes </Text>
                            </View>
                        </Pressable>
                    </View>
                )}
            />
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