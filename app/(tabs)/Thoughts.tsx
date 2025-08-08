import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, FlatList, Pressable, Text, TextInput, View } from "react-native";


export default function Thoughts() {
    const router = useRouter();
    const rotateValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        rotateValue.setValue(0);
        Animated.loop(Animated.timing(rotateValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        })).start();
    }, [])
    const spin = rotateValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] })
    const [nav, setNav] = useState(false);
    const [loader, setLoader] = useState(false);
    const [thoughts, setThoughts] = useState([])
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
            const response = await fetch("https://literasocial.onrender.com/thoughts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await response.json();
            setThoughts(data.Data);
        }
        handleSave();
    }, [])

    let cooldown = false;
    const handleMoreThoughts = async () => {
        if (loader && cooldown) return;
        setLoader(true);
        cooldown = true;
        try {
            const response = await fetch("https://literasocial.onrender.com/thoughts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await response.json();
            setThoughts(prev => [...prev, ...data.Data]);
        }
        catch (error) {
            console.log("Error Fetching more thoughts. Error:", error);
        }
        finally {
            setLoader(false);
            setTimeout(() => { cooldown = true }, 1000);
        }
    }


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

            {thoughts && <FlatList
                data={thoughts}
                ListHeaderComponent={<>
                    <View style={{ minWidth: "100%", paddingBottom: 0, alignItems: "center", }}>
                        <View style={{ minWidth: "100%", width: "80%", display: "flex", alignItems: "center", padding: 10, paddingLeft: 15, paddingRight: 15 }}>
                            <Text style={{ fontSize: 25, fontWeight: 600, textAlign: "center", paddingTop: 10 }}>Thoughts & Reflections</Text>
                            <Text style={{ fontSize: 15, color: "gray", textAlign: "left", paddingTop: 10 }}>Share your insights, musings, and connect with fellow thinkers</Text>
                            <View style={{ minHeight: 200, maxWidth: "90%", minWidth: "90%", width: "90%", paddingBottom: 20, marginTop: 20, borderWidth: 1, borderColor: "lightgray", borderRadius: 10, display: "flex", alignItems: 'center' }}>
                                <View style={{ width: "100%", display: "flex", alignItems: "center", flexDirection: 'row', padding: 15, gap: 10 }}>
                                    <Ionicons name="bulb-outline" size={20} color={"gold"} />
                                    <Text style={{ fontSize: 18, fontWeight: 500 }}>Share a thought</Text>
                                </View>
                                <TextInput multiline textAlignVertical="top" style={{ minWidth: "80%", padding: 15, borderWidth: 1, borderColor: "lightgray", borderRadius: 10, width: "80%", height: 100 }} placeholder="What's on your mind? Share your thoughts, insights or reflections..."></TextInput>
                                <Pressable style={{ padding: 10, paddingTop: 15, paddingBottom: 15, backgroundColor: "black", borderRadius: 10, display: 'flex', flexDirection: 'row', gap: 10, alignSelf: 'flex-end', marginTop: 20, marginRight: 15 }}>
                                    <Ionicons name="paper-plane-outline" size={20} color={"white"} />
                                    <Text style={{ color: "white" }}>Share Thought</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </>}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ alignItems: "center", paddingBottom: 110, gap: 40 }}
                style={{ flex: 1, display: "flex" }}
                ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
                onEndReached={handleMoreThoughts}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => (
                    <View style={{ minWidth: "85%", maxWidth: "85%", width: "110%", borderWidth: 1, borderColor: 'lightgray', display: "flex", alignItems: 'center', marginTop: 0, borderRadius: 10 }}>
                        <View style={{ position: "absolute", left: 10, width: "100%", padding: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", }}>
                            <Text style={{ padding: 15, borderRadius: 40, backgroundColor: "lightgray", color: "gray" }}>JR</Text>
                            <View style={{ display: 'flex', flexDirection: "column", alignItems: 'flex-start', padding: 10 }}>
                                <Text style={{ fontSize: 15, fontWeight: 500, textAlign: "left" }}>{item.Username}</Text>
                                <Text style={{ fontSize: 12, color: "gray", padding: 5 }}>{item.Time}</Text>
                            </View>
                            <Ionicons name="ellipsis-horizontal-outline" size={20} color={"black"} style={{ position: "absolute", right: 30 }} />
                        </View>
                        <View style={{ paddingTop: 75, width: "100%", display: "flex", alignItems: 'center', justifyContent: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: "lightgray", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                            <Text style={{ textAlign: "left", fontSize: 14, fontWeight: 500, lineHeight: 25, padding: 10 }}>
                                {item.Thought}</Text>
                        </View>
                        <View style={{ padding: 20, display: "flex", flexDirection: 'row', gap: 20, width: "100%", paddingLeft: 20 }}>
                            <View style={{ display: "flex", flexDirection: 'row', gap: 5 }}>
                                <Ionicons name="heart-outline" size={25} color={"black"} />
                                <Text style={{ fontSize: 14, paddingTop: 3 }}>{item.Likes}</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: 'row', gap: 5 }}>
                                <Ionicons name="chatbubble-outline" size={25} color={"black"} />
                                <Text style={{ fontSize: 14, paddingTop: 3 }}>{item.Comments}</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: 'row', gap: 5 }}>
                                <Ionicons name="paper-plane-outline" size={25} color={"black"} />
                                <Text style={{ fontSize: 14, paddingTop: 3 }}>{item.Shares}</Text>
                            </View>
                        </View>
                    </View>
                )}
                ListFooterComponent={<>
                    {loader && thoughts.length > 2 && <Animated.View style={[{ width: 30, height: 30, borderWidth: 1.5, borderBottomWidth: 0, borderLeftWidth: 0, borderColor: 'black', borderTopColor: '#333', borderRadius: 20 }, { transform: [{ rotate: spin }] }]}></Animated.View>}
                </>}
            />
            }
            {thoughts.length < 2 && <Animated.View style={[{ position: 'absolute', top: "75%", left: "46%", width: 30, height: 30, borderWidth: 1.5, borderBottomWidth: 0, borderLeftWidth: 0, borderColor: 'black', borderTopColor: '#333', borderRadius: 20 }, { transform: [{ rotate: spin }] }]}></Animated.View>}
            <View style={{ width: "100%", height: 80, bottom: 0, position: "absolute", zIndex: 10000000, backgroundColor: "white", borderTopWidth: 1, borderTopColor: "lightgray", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: "13%" }}>
                <Ionicons onPress={() => router.push("/(tabs)/mainpage")} name="home-outline" size={22} color={"black"} />
                <Ionicons onPress={() => router.push("/(tabs)/Thoughts")} name="chatbox" size={22} color={"black"} />
                <Ionicons onPress={() => router.push("/(tabs)/Search")} name="search-outline" size={22} color={"black"} />
                <Ionicons onPress={() => router.push("/(tabs)/Ai")} name="person-outline" size={22} color={"black"} />
                <Ionicons onPress={() => router.push("/(tabs)/Profile")} name="person-circle-outline" size={22} color={"black"} />
            </View>

        </View >
    )
}