import { Palette } from "@/constants/theme";
import { formatCurrency, getCurrentMonthYear } from "@/utils/formatter";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import OptionPill from "../ui/option-pill";
import SearchBar from "../ui/search-bar";

type Props = {
    income: number;
    expense: number;
    filterOptions: string[];
    selectedFilter: string;
    setSelectedFilter: (name: string) => void;
};

export default function FinanceHeader({ income, expense, filterOptions, selectedFilter, setSelectedFilter }: Props) {
    return (
        <View style={styles.headerContainer}>
            <SearchBar onSearch={(q) => console.log("Searching:", q)} />

            <View style={styles.spacer20} />

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.pillsRow}
            >
                {filterOptions.map((option) => (
                    <OptionPill
                        key={option}
                        optionName={option}
                        isSelected={selectedFilter === option}
                        onItemSelected={setSelectedFilter}
                    />
                ))}
            </ScrollView>

            <View style={styles.spacer20} />

            <Text style={styles.monthText}>{getCurrentMonthYear()}</Text>

            <View style={styles.summaryRow}>
                <View style={styles.summaryItem}>
                    <Ionicons name="arrow-down" size={16} color={Palette.EmeraldGreen} />
                    <Text style={[styles.summaryAmount, { color: Palette.EmeraldGreen }]}>
                        {formatCurrency(income)}
                    </Text>
                </View>

                <View style={styles.summaryItem}>
                    <Ionicons name="arrow-up" size={16} color={Palette.RedErrorLight} />
                    <Text
                        style={[styles.summaryAmount, { color: Palette.RedErrorLight }]}
                    >
                        {formatCurrency(expense)}
                    </Text>
                </View>
            </View>

            <View style={styles.spacer10} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Palette.Canvas, paddingTop: 10 },
    listContent: { paddingHorizontal: 20, paddingBottom: 100 }, // Extra bottom padding for the FAB
    headerContainer: { paddingBottom: 10 },

    pillsRow: { gap: 8, paddingRight: 20 },

    monthText: {
        fontSize: 18,
        fontWeight: "600",
        color: Palette.InkDark,
        marginBottom: 10,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    summaryItem: { flexDirection: "row", alignItems: "center", gap: 5 },
    summaryAmount: { fontSize: 14, fontWeight: "500" },

    spacer10: { height: 10 },
    spacer20: { height: 20 },
    scrollGrow: { flexGrow: 1 },
});