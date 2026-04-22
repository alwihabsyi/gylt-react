import { Palette } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

type RoundedItemCardProps = {
    text: string;
    icon?: React.ComponentProps<typeof Ionicons>['name'];
    isSelected: boolean;
    onClick: () => void;
};

export function RoundedItemCard({
    text,
    icon,
    isSelected,
    onClick,
}: RoundedItemCardProps) {
    const containerColor = isSelected
        ? `${Palette.EmeraldGreen}1A` // ~10% alpha hex
        : "#FFFFFF";
    const borderColor = isSelected ? Palette.EmeraldGreen : "#D3D3D3";

    return (
        <TouchableOpacity
            onPress={onClick}
            style={[
                styles.card,
                {
                    backgroundColor: containerColor,
                    borderColor: borderColor,
                },
            ]}
            activeOpacity={0.7}
        >
            {icon && (
                <Ionicons
                    name={icon}
                    size={24}
                    color={Palette.EmeraldGreen}
                />
            )}
            <Text
                style={[styles.text, { fontWeight: isSelected ? "600" : "400" }]}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 80,
        minHeight: 80
    },
    icon: {
        width: 28,
        height: 28,
        marginBottom: 8,
        resizeMode: "contain",
    },
    text: {
        fontSize: 12,
        color: "#000000",
    },
});
