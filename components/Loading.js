import React from "react";
import { ActivityIndicator, View, StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    loadingWrapper: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default () => {
    return (
        <View style={styles.loadingWrapper}>
            <ActivityIndicator size="large" />
        </View>
    );
};
