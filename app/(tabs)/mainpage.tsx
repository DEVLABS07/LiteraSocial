import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";


export default function mainpage() {
    const router = useRouter();
    const [nav, setNav] = useState(false);
    const [name, setName] = useState("reorder-three-outline");
    const handlenav = () => {
        setNav(!nav);
        if (!nav) {
            setName("close-outline")
        } else {
            setName("reorder-three-outline");
        }

    }
    return (
        <View style={{ flex:1, backgroundColor: "white", display: "flex", position:"relative",flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ width: "100%", height: 100, paddingTop: 20, position: "fixed", display: "flex", flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "lightgray" }}>
                <Ionicons name="book-outline" color={"black"} size={24} style={{ fontWeight: 600, paddingLeft: 26, paddingTop: 5 }} />
                <Text style={{ fontSize: 24, fontWeight: 600, paddingLeft: 10 }}>LiteraSocial</Text>
                <Ionicons onPress={handlenav} name={name} size={24} color={"black"} style={{ paddingTop: 5, position: "absolute", top: 45, right: 20 }} />
            </View>
            {nav && <View style={{ width: "100%", position: 'absolute', display: "flex", gap: 30, padding: 20, borderBottomWidth: 1, borderBottomColor: "lightgray", top:100, backgroundColor:"white" ,zIndex:10000 }}>
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
            <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom:10 }} style={{ width: "100%" }}>
                <View style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
                    <View style={{ width: "50%", display: "flex", alignItems: "center" }}>
                        <Text style={{ fontSize: 24, fontWeight: 700, padding: 15, paddingBottom: 0, textAlign: "left" }}>Literary Community</Text>
                        <Text style={{ color: "gray", padding: 15, textAlign: "left" }}>Share your stories, poems, and connect with fellow writers</Text>
                    </View>
                    <View style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Pressable style={{ width: "90%", gap: 10, height: 50, backgroundColor: "black", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'center', borderRadius: 10 }}>
                            <Ionicons name="add-outline" size={14} color={"white"} style={{ padding: 4, borderWidth: 1, borderColor: "white", borderRadius: 50 }} />
                            <Text style={{ color: "white", fontWeight: 500, textAlign: 'center' }}>Share Your Work</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={{ width: "90%", gap: 5, marginTop: 20, borderWidth: 1, borderColor: "lightgray", borderRadius: 10, padding: 10, backgroundColor: "#e3e3e334", display: "flex", alignItems: 'center', flexDirection: "row" }}>
                    <Pressable style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8, marginLeft: 3, padding: 10, backgroundColor: "black", borderRadius: 10 }}>
                        <Ionicons name="time-outline" size={15} style={{ paddingTop: 3 }} color={"white"} />
                        <Text style={{ fontSize: 10.5, fontWeight: 500, color: "white" }}>Latest</Text>
                    </Pressable>
                    <Pressable style={{ display: "flex", flexDirection: "row", backgroundColor: "", borderRadius: 10, alignItems: "center", gap: 8, padding: 10, }}>
                        <Ionicons name="trending-up-outline" size={15} style={{ paddingTop: 3 }} color={"black"} />
                        <Text style={{ fontSize: 10.5, fontWeight: 500, color: "black" }}>Trending</Text>
                    </Pressable>
                    <Pressable style={{ display: "flex", flexDirection: "row", borderRadius: 10, backgroundColor: "", alignItems: "center", gap: 8, padding: 10, }}>
                        <Ionicons name="book-outline" size={15} color={"black"} style={{ paddingTop: 3 }} />
                        <Text style={{ fontSize: 10.5, fontWeight: 500, color: "black" }}>Poems</Text>
                    </Pressable>
                    <Pressable style={{ display: "flex", flexDirection: "row", backgroundColor: "", borderRadius: 10, alignItems: "center", gap: 8, padding: 10, }}>
                        <Ionicons name="book-outline" size={15} color={"black"} style={{ paddingTop: 3 }} />
                        <Text style={{ fontSize: 10.5, fontWeight: 500, color: "black", padding: 0 }}>Stories</Text>
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
                            <Ionicons name="heart" size={25} color={"red"} />
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
                <View style={{ padding: 30 }}>

                </View>
            </ScrollView>
            <View style={{width:"100%",height:80,bottom:0,position:"absolute",zIndex:10000000, backgroundColor:"white",borderTopWidth:1,borderTopColor:"lightgray", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"row", gap:"25%"}}>
                 <Ionicons onPress={() => router.push("/(tabs)/mainpage")} name="home" size={24} color={"black"} />
                 <Ionicons onPress={() => router.push("/(tabs)/Thoughts")} name="chatbox-outline" size={24} color={"black"} />
                 <Ionicons onPress={() => router.push("/(tabs)/Ai")} name="person-outline" size={24} color={"black"} />
            </View>
            <View style={{ padding: 30 }}>

            </View>
        </View>
    )

}