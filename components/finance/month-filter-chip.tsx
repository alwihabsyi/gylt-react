import { MONTHS } from "@/constants/constants";
import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1];

export type MonthFilter = { year: number; month: number | null };

type Props = {
    value: MonthFilter;
    onChange: (f: MonthFilter) => void;
};

export default function MonthFilterChip({ value, onChange }: Props) {
    const colors = useSemanticColors();
    const [open, setOpen] = useState(false);
    const [tempYear, setTempYear] = useState(value.year);
    const [tempMonth, setTempMonth] = useState(value.month);

    const label =
        value.month === null
            ? `${value.year}`
            : `${MONTHS[value.month]} ${value.year}`;

    const apply = () => {
        onChange({ year: tempYear, month: tempMonth });
        setOpen(false);
    };

    const openModal = () => {
        setTempYear(value.year);
        setTempMonth(value.month);
        setOpen(true);
    };

    return (
        <>
            <TouchableOpacity style={styles.chip} onPress={openModal} activeOpacity={0.7}>
                <Ionicons name="calendar-outline" size={13} color={Palette.EmeraldGreen} />
                <Text style={styles.chipText}>{label}</Text>
                <Ionicons name="chevron-down" size={13} color={Palette.EmeraldGreen} />
            </TouchableOpacity>

            <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
                <TouchableOpacity
                    style={[styles.backdrop, { backgroundColor: colors.overlayScrim }]}
                    activeOpacity={1}
                    onPress={() => setOpen(false)}
                />
                <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
                    <View style={[styles.handle, { backgroundColor: colors.pillHandle }]} />
                    <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>Filter by Period</Text>

                    <Text style={[styles.label, { color: colors.textMuted }]}>Year</Text>
                    <View style={styles.row}>
                        {YEARS.map((y) => (
                            <TouchableOpacity
                                key={y}
                                style={[
                                    styles.pill,
                                    {
                                        borderColor: colors.borderHairline,
                                        backgroundColor: colors.surface,
                                    },
                                    tempYear === y && styles.pillOn,
                                ]}
                                onPress={() => setTempYear(y)}
                            >
                                <Text
                                    style={[
                                        styles.pillText,
                                        { color: colors.textPrimary },
                                        tempYear === y && styles.pillTextOn,
                                    ]}
                                >
                                    {y}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={[styles.label, { color: colors.textMuted }]}>Month</Text>
                    <TouchableOpacity
                        style={[
                            styles.pill,
                            styles.pillWide,
                            {
                                borderColor: colors.borderHairline,
                                backgroundColor: colors.surface,
                            },
                            tempMonth === null && styles.pillOn,
                        ]}
                        onPress={() => setTempMonth(null)}
                    >
                        <Text
                            style={[
                                styles.pillText,
                                { color: colors.textPrimary },
                                tempMonth === null && styles.pillTextOn,
                            ]}
                        >
                            All months
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.grid}>
                        {MONTHS.map((m, i) => (
                            <TouchableOpacity
                                key={m}
                                style={[
                                    styles.monthPill,
                                    {
                                        borderColor: colors.borderHairline,
                                        backgroundColor: colors.surface,
                                    },
                                    tempMonth === i && styles.pillOn,
                                ]}
                                onPress={() => setTempMonth(i)}
                            >
                                <Text
                                    style={[
                                        styles.pillText,
                                        { color: colors.textPrimary },
                                        tempMonth === i && styles.pillTextOn,
                                    ]}
                                >
                                    {m}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.applyBtn} onPress={apply}>
                        <Text style={[styles.applyText, { color: colors.inverseOnAccent }]}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    chip: {
        flexDirection: "row", alignItems: "center", gap: 5,
        alignSelf: "flex-start",
        backgroundColor: `${Palette.EmeraldGreen}15`,
        borderWidth: 1, borderColor: `${Palette.EmeraldGreen}35`,
        borderRadius: 20, paddingHorizontal: 11, paddingVertical: 5,
    },
    chipText: { fontSize: 13, fontWeight: "600", color: Palette.EmeraldGreen },

    backdrop: { flex: 1 },
    sheet: {
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        padding: 24, paddingBottom: 40,
    },
    handle: {
        width: 40, height: 4,
        borderRadius: 2, alignSelf: "center", marginBottom: 20,
    },
    sheetTitle: { fontSize: 17, fontWeight: "700", marginBottom: 18 },
    label: {
        fontSize: 11, fontWeight: "600",
        textTransform: "uppercase", letterSpacing: 0.5,
        marginBottom: 8, marginTop: 14,
    },
    row: { flexDirection: "row", gap: 8 },
    pill: {
        paddingHorizontal: 16, paddingVertical: 8,
        borderRadius: 20, borderWidth: 1,
    },
    pillWide: { alignSelf: "flex-start", marginBottom: 8 },
    pillOn: { backgroundColor: Palette.EmeraldGreen, borderColor: Palette.EmeraldGreen },
    pillText: { fontSize: 14, fontWeight: "500" },
    pillTextOn: { color: "#fff" },
    grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    monthPill: {
        width: "22%", paddingVertical: 8,
        borderRadius: 12, borderWidth: 1,
        alignItems: "center",
    },
    applyBtn: {
        marginTop: 26, backgroundColor: Palette.EmeraldGreen,
        borderRadius: 14, paddingVertical: 14, alignItems: "center",
    },
    applyText: { fontSize: 16, fontWeight: "700" },
});