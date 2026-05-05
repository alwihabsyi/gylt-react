import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { useTranslation } from "@/hooks/useTranslation";
import type { TranslationKey } from "@/locales";
import { formatCurrency } from "@/utils/formatter";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import MonthFilterChip, { MonthFilter } from "../finance/month-filter-chip";
import OptionPill from "../ui/option-pill";
import SearchBar from "../ui/search-bar";

export type FinanceFilterOption = { value: string; label: string };

type Props = {
    income: number;
    expense: number;
    filterOptions: FinanceFilterOption[];
    selectedFilter: string;
    setSelectedFilter: (name: string) => void;
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    dateFilter: MonthFilter;
    onDateChange: (f: MonthFilter) => void;
};

export default function FinanceHeader({
    income, expense,
    filterOptions, selectedFilter, setSelectedFilter,
    searchQuery, setSearchQuery,
    dateFilter, onDateChange,
}: Props) {
    const colors = useSemanticColors();
    const { t } = useTranslation();
    const monthFullKey =
        dateFilter.month !== null
            ? (`months.full.${dateFilter.month}` as TranslationKey)
            : null;
    const periodLabel =
        dateFilter.month === null
            ? t("finance.periodAllYear", { year: dateFilter.year })
            : `${monthFullKey ? t(monthFullKey) : ""} ${dateFilter.year}`;

    return (
        <View style={styles.headerContainer}>
            <SearchBar
                value={searchQuery}
                onSearch={setSearchQuery}
                placeholder={t("finance.searchPlaceholder")}
            />

            <View style={styles.spacer20} />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsRow}>
                {filterOptions.map((option) => (
                    <OptionPill
                        key={option.value}
                        optionName={option.value}
                        displayLabel={option.label}
                        isSelected={selectedFilter === option.value}
                        onItemSelected={setSelectedFilter}
                    />
                ))}
            </ScrollView>

            <View style={styles.spacer20} />

            {/* Month label + filter chip side by side */}
            <View style={styles.monthRow}>
                <Text style={[styles.monthText, { color: colors.textPrimary }]}>{periodLabel}</Text>
                <MonthFilterChip value={dateFilter} onChange={onDateChange} />
            </View>

            <View style={styles.summaryRow}>
                <View style={styles.summaryItem}>
                    <Ionicons name="arrow-down" size={16} color={Palette.EmeraldGreen} />
                    <Text style={[styles.summaryAmount, { color: Palette.EmeraldGreen }]}>
                        {formatCurrency(income)}
                    </Text>
                </View>
                <View style={styles.summaryItem}>
                    <Ionicons name="arrow-up" size={16} color={Palette.RedErrorLight} />
                    <Text style={[styles.summaryAmount, { color: Palette.RedErrorLight }]}>
                        {formatCurrency(expense)}
                    </Text>
                </View>
            </View>

            <View style={styles.spacer10} />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: { paddingBottom: 10 },
    pillsRow: { gap: 8, paddingRight: 20 },
    monthRow: {
        flexDirection: "row", alignItems: "center",
        justifyContent: "space-between", marginBottom: 10,
    },
    monthText: { fontSize: 18, fontWeight: "600" },
    summaryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    summaryItem: { flexDirection: "row", alignItems: "center", gap: 5 },
    summaryAmount: { fontSize: 14, fontWeight: "500" },
    spacer10: { height: 10 },
    spacer20: { height: 20 },
});