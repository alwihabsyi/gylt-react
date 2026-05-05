import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { Goals } from "@/domain/Goals";
import { GoalType } from "@/types/goal";
import { formatNumber, unformatNumber } from "@/utils/formatter";
import { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
    goal: Goals;
    visible: boolean;
    onClose: () => void;
    onSave: (amount: number) => void;
    saving: boolean;
};

export function UpdateProgressSheet({ goal, visible, onClose, onSave, saving }: Props) {
    const colors = useSemanticColors();
    const [input, setInput] = useState(goal.currentAmount.toString());
    const isFinancial = goal.goalType === GoalType.Financial;

    const handleSave = () => {
        const parsed = parseFloat(unformatNumber(input).replace(/,/g, "."));
        if (isNaN(parsed) || parsed < 0) {
            Alert.alert("Invalid amount", "Please enter a valid number.");
            return;
        }
        onSave(parsed);
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={[styles.overlay, { backgroundColor: colors.overlayScrim }]}
                activeOpacity={1}
                onPress={onClose}
            />
            <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
                <View style={[styles.handle, { backgroundColor: colors.sheetHandle }]} />
                <Text style={[styles.title, { color: colors.textPrimary }]}>Update Progress</Text>
                <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                    {isFinancial
                        ? "Enter your current saved amount"
                        : "Enter your current progress count"}
                </Text>

                <View style={styles.inputRow}>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: colors.surfaceInset,
                                color: colors.textPrimary,
                            },
                        ]}
                        value={formatNumber(input)}
                        onChangeText={setInput}
                        keyboardType="numeric"
                        placeholder="0"
                        placeholderTextColor={colors.textMuted}
                        autoFocus
                    />
                    <Text style={[styles.inputHint, { color: colors.textMuted }]}>
                        of {formatNumber(goal.targetAmount.toString())}{isFinancial ? "" : " total"}
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                    onPress={handleSave}
                    activeOpacity={0.85}
                    disabled={saving}
                >
                    <Text style={[styles.saveButtonText, { color: colors.inverseOnAccent }]}>
                        {saving ? "Saving…" : "Save Progress"}
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1 },
    sheet: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
        gap: 12,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        alignSelf: "center",
        marginBottom: 8,
    },
    title: { fontSize: 18, fontWeight: "900" },
    subtitle: { fontSize: 13, fontWeight: "500" },
    inputRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 4 },
    input: {
        flex: 1,
        height: 52,
        borderRadius: 14,
        paddingHorizontal: 16,
        fontSize: 20,
        fontWeight: "800",
    },
    inputHint: { fontSize: 13, fontWeight: "600" },
    saveButton: {
        height: 52,
        borderRadius: 16,
        backgroundColor: Palette.EmeraldGreen,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },
    saveButtonDisabled: { opacity: 0.6 },
    saveButtonText: { fontWeight: "900", fontSize: 15 },
});