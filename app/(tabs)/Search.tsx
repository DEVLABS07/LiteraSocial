import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Search() {
    const router = useRouter();
    const [option, setOption] = useState("l");
    const [data, setData] = useState(['', '', '']);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('user');

    const handle_search = async () => {
        try {
            const response = await axios.post("https://literasocial.onrender.com/search", {
                search: search,
                type: type
            })
            console.log(response.data.results);
        }
        catch(error){
            console.error("Error fetching data:",error);
        }
       
    }




    return (
        <View style={{ flex: 1, backgroundColor: "white", display: "flex", alignItems: 'center', paddingTop: 50 }}>
            <TextInput value={search} onChangeText={setSearch} style={{ width: "90%", height: 50, borderWidth: 1, borderColor: "gray", borderRadius: 40, padding: 10, paddingLeft: 20, paddingRight: 20 }} placeholder="Search for Poems, Stories, Users..." />
            <Pressable style={{ display: "flex", alignItems: 'center', flexDirection: 'row', width: "100%", justifyContent: "center", paddingTop: 20, gap: 20 }}>
                <Pressable onPress={() => {setOption("l"); handle_search();}} style={{ width: "43%", padding: 21, backgroundColor: option == "l" ? "black" : "white", borderWidth: 1, borderColor: option == "l" ? "white" : "black", borderRadius: 10, alignItems: "center" }}><Text style={{ color: option == "l" ? "white" : "black" }}>Literature</Text></Pressable>
                <Pressable onPress={() => setOption("a")} style={{ width: "43%", padding: 20, backgroundColor: option == "a" ? "black" : "white", borderWidth: 1, borderColor: "black", borderRadius: 10, alignItems: 'center' }}><Text style={{ color: option == "a" ? "white" : "black" }}>Accounts</Text></Pressable>
            </Pressable>
            <FlatList
                data={data}
                contentContainerStyle={{ gap: 10 }}
                renderItem={({ item }) => (
                    <View style={{ display: 'flex', alignItems: 'center' }}>
                        <Pressable style={{ minWidth: "95%", maxWidth: "95%", width: "110%", borderWidth: 1, borderColor: 'lightgray', display: "flex", alignItems: 'center', borderRadius: 10, marginTop: 20, }}>
                            <View style={{ left: 10, width: "100%", padding: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", }}>
                                <Text style={{ padding: 15, borderRadius: 40, backgroundColor: "lightgray", color: "lightgray" }}>JR</Text>
                                <View style={{ display: 'flex', flexDirection: "column", alignItems: 'flex-start', padding: 10, gap: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 500, textAlign: "left", backgroundColor: "lightgray", borderRadius: 20, color: "lightgray" }}>VoiceOfYouth</Text>
                                    <Text style={{ fontSize: 12, color: "lightgray", padding: 0, backgroundColor: "lightgray", borderRadius: 20 }}>user112</Text>
                                </View>
                                <Ionicons name="ellipsis-horizontal-outline" size={20} color={"lightgray"} style={{ position: "absolute", right: 30, zIndex: 1000000000, backgroundColor: "lightgray", borderRadius: 20 }} />
                            </View>
                        </Pressable>
                    </View>
                )}
            />
            <View style={{ width: "100%", height: 80, bottom: 0, position: "absolute", zIndex: 10000000, backgroundColor: "white", borderTopWidth: 1, borderTopColor: "lightgray", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", }}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => router.push("/(tabs)/mainpage")} style={{ width: "19%", height: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                    <Ionicons name="home-outline" size={22} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => router.push("/(tabs)/Thoughts")} style={{ width: "19%", height: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                    <Ionicons name="chatbox-outline" size={22} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => router.push("/(tabs)/Search")} style={{ width: "19%", height: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                    <Ionicons name="search" size={22} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => router.push("/(tabs)/Ai")} style={{ width: "19%", height: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                    <Ionicons name="person-outline" size={22} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => router.push("/(tabs)/Profile")} style={{ width: "19%", height: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                    <Ionicons name="person-circle-outline" size={22} color={"black"} />
                </TouchableOpacity>
            </View>

        </View>
    )

}