import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";


export default function Thoughts() {
    const router = useRouter();
    const [nav, setNav] = useState(false);
    const [thoughts, setThoughts] = useState([]);
    const [name, setName] = useState("reorder-three-outline");
    const handlenav = () => {
        setNav(!nav);
        if (!nav) {
            setName("close-outline")
        } else {
            setName("reorder-three-outline");
        }

    }
    useEffect(() => {
        const handleSave = async () => {
            const response = await fetch("http://127.0.0.1:8000/thoughts", {
                method: "GET",
                headers: {
                    "Content-Type": "application / json",
                }
            })
            const data = await response.json();
            setThoughts(data.Data);
            console.log(data.Data);
        }
        handleSave();
    }, [])


    return (
        <View style={{ flex: 1, position: "relative", backgroundColor: "white", display: "flex" }} >
            <View style={{ width: "100%", height: 100, paddingTop: 20, display: "flex", flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "lightgray" }}>
                <Ionicons name="book-outline" color={"black"} size={24} style={{ fontWeight: 600, paddingLeft: 26, paddingTop: 5 }} />
                <Text style={{ fontSize: 24, fontWeight: 600, paddingLeft: 10 }}>LiteraSocial</Text>
                <Ionicons onPress={handlenav} name={name} size={24} color={"black"} style={{ paddingTop: 5, position: "absolute", top: 45, right: 20 }} />
            </View>
            {nav && <View style={{ width: "100%", position: 'absolute', display: "flex", gap: 30, padding: 20, borderBottomWidth: 1, borderBottomColor: "lightgray", top: 100, backgroundColor: "white", zIndex: 10000 }}>
                <Pressable onPress={() => router.push("/(tabs)/mainpage")} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 20 }}>
                    <Ionicons name="book-outline" color={"black"} size={20} style={{ fontWeight: 600, paddingTop: 5 }} />
                    <Text style={{ fontSize: 20, fontWeight: 400 }}>Literature</Text>
                </Pressable>
                <Pressable onPress={() => { router.push("/(tabs)/Thoughts") }} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 20 }}>
                    <Ionicons name="chatbox-outline" color={"black"} size={20} style={{ fontWeight: 600, paddingTop: 5 }} />
                    <Text style={{ fontSize: 20, fontWeight: 400 }}>Thoughts</Text>
                </Pressable>
                <Pressable onPress={() => router.push("/(tabs)/Ai")} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 20 }}>
                    <Ionicons name="logo-reddit" color={"black"} size={20} style={{ fontWeight: 600, paddingTop: 5 }} />
                    <Text style={{ fontSize: 20, fontWeight: 400, paddingRight: 18 }}>AI Chat</Text>
                </Pressable>
            </View>}
            <View style={{ flex: 1,  alignItems: "center", paddingBottom: 40}}>
                <View style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 10, paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{ fontSize: 25, fontWeight: 600, textAlign: "center", paddingTop: 10 }}>Thoughts & Reflections</Text>
                    <Text style={{ fontSize: 15, color: "gray", textAlign: "left", paddingTop: 10 }}>Share your insights, musings, and connect with fellow thinkers</Text>
                    <View style={{ width: "95%", paddingBottom: 20, marginTop: 20, borderWidth: 1, borderColor: "lightgray", borderRadius: 10, display: "flex", alignItems: 'center' }}>
                        <View style={{ width: "100%", display: "flex", alignItems: "center", flexDirection: 'row', padding: 15, gap: 10 }}>
                            <Ionicons name="bulb-outline" size={20} color={"gold"} />
                            <Text style={{ fontSize: 18, fontWeight: 500 }}>Share a thought</Text>
                        </View>
                        <TextInput multiline textAlignVertical="top" style={{ padding: 15, borderWidth: 1, borderColor: "lightgray", borderRadius: 10, width: "90%", height: 100 }} placeholder="What's on your mind? Share your thoughts, insights or reflections..."></TextInput>
                        <Pressable style={{ padding: 10, paddingTop: 15, paddingBottom: 15, backgroundColor: "black", borderRadius: 10, display: 'flex', flexDirection: 'row', gap: 10, alignSelf: 'flex-end', marginTop: 20, marginRight: 15 }}>
                            <Ionicons name="paper-plane-outline" size={20} color={"white"} />
                            <Text style={{ color: "white" }}>Share Thought</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={{ width: "90%", marginTop: 20, borderWidth: 1, borderColor: "lightgray", borderRadius: 10, padding: 10, backgroundColor: "#e3e3e334", display: "flex", alignItems: 'center', flexDirection: "row", gap: 25 }}>
                    <Pressable style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8, padding: 10, backgroundColor: "black", borderRadius: 10 }}>
                        <Ionicons name="time-outline" size={15} style={{ paddingTop: 3 }} color={"white"} />
                        <Text style={{ fontSize: 14, fontWeight: 500, color: "white" }}>Latest</Text>
                    </Pressable>
                    <Pressable style={{ display: "flex", flexDirection: "row", borderRadius: 10, alignItems: "center", gap: 8, padding: 10, }}>
                        <Ionicons name="trending-up-outline" size={15} style={{ paddingTop: 3 }} color={"black"} />
                        <Text style={{ fontSize: 14, fontWeight: 500, color: "black", borderRadius: 10 }}>Trending</Text>
                    </Pressable>
                    <Pressable style={{ display: "flex", flexDirection: "row", borderRadius: 10, alignItems: "center", gap: 8, padding: 10, }}>
                        <Ionicons name="bulb-outline" size={15} color={"black"} style={{ paddingTop: 3 }} />
                        <Text style={{ fontSize: 14, fontWeight: 500 }}>Inspiring</Text>
                    </Pressable>
                </View>
                <View style={{ width: "90%", borderWidth: 1, borderRadius: 10, borderColor: "lightgray", marginTop: 20, backgroundColor: "white", padding: 20, gap: 25 }}>
                    <View style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Ionicons name="at-circle-outline" size={20} color={"black"} />
                        <Text style={{ fontSize: 20, fontWeight: 500 }}>Featured Today</Text>
                    </View>
                    <Text style={{ color: "gray", fontSize: 15 }}>"The best stories are the ones that remind us why we fell in love with words in the first place."</Text>
                    <Text style={{ color: "black", fontSize: 17, fontWeight: 500 }}>Explore featured collections →</Text>
                </View>
                <FlatList
                    data={thoughts}
                    contentContainerStyle={{alignItems:"center"}}
                    style={{width:"100%"}}
                    keyExtractor={(item, key) => key.toString()}
                    renderItem={(item, key) => (
                        <View style={{ width: "90%", borderWidth: 1, borderColor: 'lightgray', display: "flex", alignItems: 'center', marginTop: 20, borderRadius: 10 }}>
                            <View style={{ width: "100%", padding: 15, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ padding: 15, borderRadius: 40, backgroundColor: "lightgray", color: "gray" }}>JR</Text>
                                <View style={{ display: 'flex', flexDirection: "column", alignItems: 'center', padding: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 500 }}>Jayaram</Text>
                                    <Text style={{ fontSize: 12, color: "gray", padding: 5 }}>@itz_jram18</Text>
                                </View>
                                <Ionicons name="ellipsis-horizontal-outline" size={20} color={"black"} style={{ position: "relative", left: "47%" }} />
                            </View>
                            <View style={{ width: "100%", display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: "center", gap: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: 500 }}>The Symphony of Rain</Text>
                                <Text style={{ padding: 10, fontSize: 12, borderRadius: 20, backgroundColor: "lightgray", color: "black" }}>Poem</Text>
                            </View>
                            <View style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: "lightgray", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                                <Text style={{ textAlign: "left", fontSize: 14, fontWeight: 500, lineHeight: 25 }}>
                                    {"The rain speaks in whispers tonight,\nEach droplet a note in nature's song, \nFalling through darkness into light,\nWhere earthbound dreams and sky belong.\nI listen to its ancient tale,\nOf journeys through cloud and storm,\nOf how the gentle waters sail\nTo keep our sleeping world warm."}</Text>
                            </View>
                            <View style={{ padding: 20, display: "flex", flexDirection: 'row', gap: 20, width: "100%", paddingLeft: 20 }}>
                                <View style={{ display: "flex", flexDirection: 'row', gap: 5 }}>
                                    <Ionicons name="heart-outline" size={25} color={"black"} />
                                    <Text style={{ fontSize: 14, paddingTop: 3 }}>12</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: 'row', gap: 5 }}>
                                    <Ionicons name="chatbubble-outline" size={25} color={"black"} />
                                    <Text style={{ fontSize: 14, paddingTop: 3 }}>12</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: 'row', gap: 5 }}>
                                    <Ionicons name="paper-plane-outline" size={25} color={"black"} />
                                    <Text style={{ fontSize: 14, paddingTop: 3 }}>12</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />

            </View>
            <View style={{ padding: 30 }}></View>
            <View style={{ width: "100%", height: 80, bottom: 0, position: "absolute", zIndex: 10000000, backgroundColor: "white", borderTopWidth: 1, borderTopColor: "lightgray", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: "25%" }}>
                <Ionicons onPress={() => router.push("/(tabs)/mainpage")} name="home-outline" size={24} color={"black"} />
                <Ionicons onPress={() => router.push("/(tabs)/Thoughts")} name="chatbox" size={24} color={"black"} />
                <Ionicons onPress={() => router.push("/(tabs)/Ai")} name="person-outline" size={24} color={"black"} />
            </View>
        </View >
    )
}