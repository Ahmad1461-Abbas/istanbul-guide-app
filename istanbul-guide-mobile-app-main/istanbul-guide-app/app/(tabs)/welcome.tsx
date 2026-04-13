import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    View,
} from "react-native";


// ==============================
// Component
// ==============================

export default function WelcomeScreen() {

    // ==============================
    // Animation Refs
    // ==============================

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateAnim = useRef(new Animated.Value(18)).current;
    const scaleAnim = useRef(new Animated.Value(0.94)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;


    // ==============================
    // Effects
    // ==============================

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 900,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(translateAnim, {
                toValue: 0,
                duration: 900,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 900,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.06,
                    duration: 1400,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1400,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        const timer = setTimeout(() => {
            router.replace("/sign-in");
        }, 2400);

        return () => clearTimeout(timer);
    }, [fadeAnim, pulseAnim, scaleAnim, translateAnim]);


    // ==============================
    // Render
    // ==============================

    return (
        <LinearGradient
            colors={["#07111f", "#0f1d36", "#163056"]}
            style={styles.container}
        >

            {/* ============================== */}
            {/* Background Glow */}
            {/* ============================== */}

            <View style={styles.topGlow} />
            <View style={styles.bottomGlow} />

            {/* ============================== */}
            {/* Main Content */}
            {/* ============================== */}

            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [
                            { translateY: translateAnim },
                            { scale: scaleAnim },
                        ],
                    },
                ]}
            >

                {/* ============================== */}
                {/* Brand Mark */}
                {/* ============================== */}

                <Animated.View
                    style={[
                        styles.logoOuter,
                        {
                            transform: [{ scale: pulseAnim }],
                        },
                    ]}
                >
                    <View style={styles.logoInner}>
                        <Text style={styles.logoText}>IG</Text>
                    </View>
                </Animated.View>

                {/* ============================== */}
                {/* Headline */}
                {/* ============================== */}

                <Text style={styles.title}>Istanbul Guide</Text>
                <Text style={styles.subtitle}>
                    Explore timeless landmarks, cultural treasures, and the story of Istanbul through a modern interactive guide.
                </Text>

                {/* ============================== */}
                {/* Loading Bar */}
                {/* ============================== */}

                <View style={styles.loaderTrack}>
                    <Animated.View
                        style={[
                            styles.loaderFill,
                            {
                                opacity: fadeAnim,
                            },
                        ]}
                    />
                </View>

                <Text style={styles.loadingText}>Preparing your experience...</Text>
            </Animated.View>
        </LinearGradient>
    );
}


// ==============================
// Styles
// ==============================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        overflow: "hidden",
    },

    topGlow: {
        position: "absolute",
        top: -120,
        right: -80,
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: "rgba(96, 165, 250, 0.16)",
    },

    bottomGlow: {
        position: "absolute",
        bottom: -140,
        left: -90,
        width: 320,
        height: 320,
        borderRadius: 160,
        backgroundColor: "rgba(59, 130, 246, 0.12)",
    },

    content: {
        width: "100%",
        maxWidth: 360,
        alignItems: "center",
    },

    logoOuter: {
        width: 106,
        height: 106,
        borderRadius: 53,
        backgroundColor: "rgba(255,255,255,0.08)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 26,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.10)",
    },

    logoInner: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
    },

    logoText: {
        fontSize: 26,
        fontWeight: "800",
        color: "#0f172a",
        letterSpacing: 1,
    },

    title: {
        fontSize: 32,
        fontWeight: "800",
        color: "#ffffff",
        marginBottom: 10,
        textAlign: "center",
    },

    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: "rgba(255,255,255,0.78)",
        textAlign: "center",
        marginBottom: 28,
        paddingHorizontal: 6,
    },

    loaderTrack: {
        width: "100%",
        height: 8,
        borderRadius: 999,
        backgroundColor: "rgba(255,255,255,0.12)",
        overflow: "hidden",
        marginBottom: 12,
    },

    loaderFill: {
        width: "72%",
        height: "100%",
        borderRadius: 999,
        backgroundColor: "#ffffff",
    },

    loadingText: {
        fontSize: 13,
        color: "rgba(255,255,255,0.72)",
    },
});