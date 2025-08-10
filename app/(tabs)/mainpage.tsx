import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, FlatList, Pressable, Text, View } from "react-native";
import AddPost from "./AddPost";


export default function mainpage() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [nav, setNav] = useState(false);
    const [liked, setLiked] = useState([{}]);
    const [likedQueue, setlikedQueue] = useState([]);
    const [loader, setLoader] = useState(false);
    const [addpost, setAddpost] = useState(false);
    const [likedanimation, setlikedAnimations] = useState(false);
    const [options, setOptions] = useState({});
    const [usermail, setUsermail] = useState('');
    const [name, setName] = useState("reorder-three-outline");
    const rotateValue = useRef(new Animated.Value(0)).current;
    const spin = rotateValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] })
    useEffect(() => {
        rotateValue.setValue(0);
        Animated.loop(Animated.timing(rotateValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        })).start();
    }, [])

    useEffect(() => {
        const fetch_user_mail = async () => {
            const user = await AsyncStorage.getItem("username");
            if (!user) {
                router.push("/(tabs)/Login");
            } else {
                setUsermail(user);
            }
        }
        fetch_user_mail();
        const handle_fetchPosts = async () => {
            const response = await axios.get("https://literasocial.onrender.com/Posts");
            setPosts(prev => [...prev, ...response.data.Data]);
        }
        handle_fetchPosts();

        const fetch_Liked = async () => {
            const liked = await AsyncStorage.getItem("post-likes");
            if (liked) {
                setLiked(JSON.parse(liked));
            }
        }
        fetch_Liked();


    }, [])



    const handlenav = () => {
        if (addpost) {
            setAddpost(!addpost);
            setName("reorder-three-outline");
            return;
        }
        setNav(!nav);
        if (!nav) {
            setName("close-outline")
        } else {
            setName("reorder-three-outline");
        }

    }

    const handle_addPost = () => {
        setAddpost(!addpost);
        setName("close-outline")
    }

    const checkOptions = () => {
        if (options) {
            setOptions(!options);
        }
    }

    let cooldown = false;
    const fetch_more_posts = async () => {
        if (loader && cooldown) return;
        setLoader(true);
        cooldown = true;
        try {
            const response = await axios.get("https://literasocial.onrender.com/Posts");
            setPosts(prev => [...prev, ...response.data.Data]);
        }
        catch (error) {
            console.error("Error Fetching posts, Error:", error);
        } finally {
            setLoader(false);
            setTimeout(() => { cooldown = true }, 1000)
        }

    }


    const flushLikes = async () => {
        try {
            const response = await axios.post("https://literasocial.onrender.com/likes", {
                like: likedQueue,
                email: usermail
            });
            console.log(response.data);
        }
        catch(error){
            console.error("Error Saving Likes. Error:",error);
        }
    }

    const handleLikes = (item) => {
        if (liked.some(count => count.id == item._id)) {
            setLiked(liked.filter(post => post.id != item._id));
            setlikedQueue(likedQueue.filter(post => post.id != item._id));
        } else {
            setLiked(prev => [...prev, { id: item._id }])
            setlikedQueue(prev => [...prev, { id: item._id }]);
        }
        if (likedQueue.length > 3) {
            console.log("Lenght limit exceeded");
            flushLikes();
        }
    }



    useEffect(() => {
        const saveLikes = async () => {
            await AsyncStorage.setItem("post-likes", JSON.stringify(liked));
        }
        saveLikes()
    }, [liked])

    return (
        <View style={{ flex: 1, backgroundColor: "white", display: "flex", position: "relative", flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ width: "100%", height: 100, paddingTop: 20, position: "fixed", display: "flex", flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "lightgray" }}>
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
            <FlatList
                data={posts}
                ListHeaderComponent={<>
                    <View style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
                        <View style={{ width: "50%", display: "flex", alignItems: "center" }}>
                            <Text style={{ fontSize: 24, fontWeight: 700, padding: 15, paddingBottom: 0, textAlign: "left" }}>Literary Community</Text>
                            <Text style={{ color: "gray", padding: 15, textAlign: "left" }}>Share your stories, poems, and connect with fellow writers</Text>
                        </View>
                        <View style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Pressable onPress={handle_addPost} style={{ width: "90%", gap: 10, height: 50, backgroundColor: "black", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'center', borderRadius: 10 }}>
                                <Ionicons name="add-outline" size={14} color={"white"} style={{ padding: 4, borderWidth: 1, borderColor: "white", borderRadius: 50 }} />
                                <Text style={{ color: "white", fontWeight: 500, textAlign: 'center' }}>Share Your Work</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ marginLeft: "5%", width: "90%", gap: 5, marginTop: 20, borderWidth: 1, borderColor: "lightgray", borderRadius: 10, padding: 10, backgroundColor: "#e3e3e334", display: "flex", alignItems: 'center', flexDirection: "row" }}>
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
                    <View style={{ marginLeft: "5%", width: "90%", borderWidth: 1, borderRadius: 10, borderColor: "lightgray", marginTop: 20, backgroundColor: "white", padding: 20, gap: 25 }}>
                        <View style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <Ionicons name="at-circle-outline" size={20} color={"black"} />
                            <Text style={{ fontSize: 20, fontWeight: 500 }}>Featured Today</Text>
                        </View>
                        <Text style={{ color: "gray", fontSize: 15 }}>"The best stories are the ones that remind us why we fell in love with words in the first place."</Text>
                        <Text style={{ color: "black", fontSize: 17, fontWeight: 500 }}>Explore featured collections →</Text>
                    </View>
                    {posts.length < 1 ? <Animated.View style={[{ width: 30, height: 30, marginLeft: "45%", marginTop: 50, borderWidth: 1.5, borderBottomWidth: 0, borderLeftWidth: 0, borderColor: 'black', borderTopColor: '#333', borderRadius: 20 }, { transform: [{ rotate: spin }] }]}></Animated.View> : null}
                </>}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ alignItems: "center", paddingBottom: 50, gap: 20 }}
                style={{ flex: 1, display: "flex", position: "relative" }}
                ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
                onEndReached={fetch_more_posts}
                onEndReachedThreshold={0.8}
                renderItem={({ item }) => (
                    <Pressable onPress={checkOptions} style={{ minWidth: "90%", maxWidth: "90%", borderWidth: 1, borderColor: 'lightgray', display: "flex", marginTop: 0, borderRadius: 10, position: 'relative' }}>
                        {options.id == item._id ? <View style={{ padding: 20, right: 20, top: 20, zIndex: 100000000, borderRadius: 10, backgroundColor: "white", borderWidth: 1, borderColor: "lightgray", position: "absolute" }}>
                            <Pressable onPress={checkOptions} style={{ backgroundColor: "red", borderRadius: 10, padding: 10 }}>
                                <Text style={{ color: "white", fontSize: 13 }}>Report</Text>
                            </Pressable>
                        </View> : null}
                        <View style={{ width: "100%", padding: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start" }}>
                            <Text style={{ padding: 15, borderRadius: 40, backgroundColor: "lightgray", color: "gray" }}>JR</Text>
                            <View style={{ display: 'flex', flexDirection: "column", padding: 10 }}>
                                <Text style={{ fontSize: 15, fontWeight: 500, textAlign: 'left', paddingLeft: 5 }}>{item.Username}</Text>
                                <Text style={{ fontSize: 12, color: "gray", padding: 5 }}>{item.time}</Text>
                            </View>
                            <Ionicons onPress={() => setOptions({ id: item._id })} name="ellipsis-horizontal-outline" size={20} color={"black"} style={{ position: "relative", left: "50%" }} />
                        </View>
                        <View style={{ width: "100%", display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 500, flexWrap: "wrap" }}>{item.heading}</Text>
                            <Text style={{ padding: 10, fontSize: 12, borderRadius: 20, backgroundColor: "lightgray", color: "black" }}>{item.tag}</Text>
                        </View>
                        <View style={{ width: "100%", display: "flex", alignItems: 'center', alignContent: 'center', padding: 20, }}>
                            <Text style={{ textAlign: "left", paddingLeft: 0, fontSize: 14, fontWeight: 500, lineHeight: 25 }}>
                                {item.content}</Text>
                        </View>
                        <View style={{ padding: 20, display: "flex", flexDirection: 'row', gap: 20, maxWidth: "100%", minWidth: "100%", paddingLeft: 30, borderTopWidth: 1, borderTopColor: "lightgray", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <Pressable onPressIn={() => setlikedAnimations(true)} onPressOut={() => setlikedAnimations(false)} onPress={() => handleLikes(item)} style={{ display: "flex", flexDirection: 'row', gap: 5 }}>
                                <Ionicons name={liked.some(count => count.id == item._id) ? "heart" : "heart-outline"} size={likedanimation ? 27 : 25} color={liked.some(count => count.id == item._id) ? "red" : "black"} />
                                <Text style={{ fontSize: 14, paddingTop: 3 }}>{liked.some(count => count.id == item._id) ? item.likes + 1 : item.likes}</Text>
                            </Pressable>
                            <Pressable style={{ display: "flex", flexDirection: 'row', gap: 5 }}>
                                <Ionicons name="chatbubble-outline" size={25} color={"black"} />
                                <Text style={{ fontSize: 14, paddingTop: 3 }}>{item.comments}</Text>
                            </Pressable>
                            <Pressable style={{ display: "flex", flexDirection: 'row', gap: 5 }}>
                                <Ionicons name="paper-plane-outline" size={25} color={"black"} />
                                <Text style={{ fontSize: 14, paddingTop: 3 }}>{item.share}</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                )}
                ListFooterComponent={<>
                    {posts.length > 2 && <Animated.View style={[{ width: 30, height: 30, borderWidth: 1.5, borderBottomWidth: 0, borderLeftWidth: 0, borderColor: 'black', borderTopColor: '#333', borderRadius: 20 }, { transform: [{ rotate: spin }] }]}></Animated.View>}
                </>}
            />
            <View style={{ width: "100%", height: 80, bottom: 0, position: "absolute", zIndex: 10000000, backgroundColor: "white", borderTopWidth: 1, borderTopColor: "lightgray", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: "13%" }}>
                <Ionicons onPress={() => router.push("/(tabs)/mainpage")} name="home" size={22} color={"black"} />
                <Ionicons onPress={() => router.push("/(tabs)/Thoughts")} name="chatbox-outline" size={22} color={"black"} />
                <Ionicons onPress={() => router.push("/(tabs)/Search")} name="search-outline" size={22} color={"black"} />
                <Ionicons onPress={() => router.push("/(tabs)/Ai")} name="person-outline" size={22} color={"black"} />
                <Ionicons onPress={() => router.push("/(tabs)/Profile")} name="person-circle-outline" size={22} color={"black"} />
            </View>
            {addpost && <AddPost />}
            <View style={{ padding: 30 }}>

            </View>
        </View>
    )

}