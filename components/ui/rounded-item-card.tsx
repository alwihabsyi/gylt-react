import { Palette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
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
    const scheme = useColorScheme() ?? "light";
    const colors = useSemanticColors();
    const idleSurface =
        scheme === "dark" ? colors.surfaceMuted : colors.surface;
    const containerColor = isSelected
        ? `${Palette.EmeraldGreen}1A`
        : idleSurface;
    const borderColor = isSelected ? Palette.EmeraldGreen : colors.borderLight;

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
                    style={[{marginBottom: 5}]}
                />
            )}
            <Text
                style={[styles.text, { fontWeight: isSelected ? "600" : "400", color: colors.textPrimary }]}
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
    },
});
