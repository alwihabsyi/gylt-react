import { LabeledTextField } from '@/components/ui/labeled-text-field';
import { RoundedItemCard } from '@/components/ui/rounded-item-card';
import { SimpleGrid } from '@/components/ui/simple-grid';
import { Palette } from '@/constants/theme';
import { ActivityType, ALL_ACTIVITY_TYPES } from '@/types/activity';
import { ALL_CATEGORIES, Category, CategoryType } from '@/types/category';
import { ALL_PAYMENT_METHODS } from '@/types/payment-method';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  onBack: () => void;
};

export default function AddTransactionScreen({ onBack }: Props) {
  const [selectedType, setSelectedType] = useState<string>(ActivityType.Income);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(Category.Bills);

  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Income / Expense Toggle */}
        <View style={styles.typeRow}>
          {ALL_ACTIVITY_TYPES.map((type) => {
            const selected = selectedType === type;
            return (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  { backgroundColor: selected ? Palette.EmeraldGreen : '#FFFFFF' },
                ]}
                onPress={() => setSelectedType(type)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    { color: selected ? '#FFFFFF' : '#000000' },
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <LabeledTextField
            fieldType={{ kind: 'number' }}
            label="Amount"
            value={amount}
            onValueChange={setAmount}
            prefix="Rp "
          />

          {selectedType === ActivityType.Expense && (
            <View style={styles.categorySection}>
              <Text style={styles.sectionLabel}>Category</Text>
              <SimpleGrid
                items={ALL_CATEGORIES}
                columns={3}
                horizontalSpacing={10}
                verticalSpacing={10}
                renderItem={(category) => (
                  <RoundedItemCard
                    text={category.title}
                    icon={category.iconName}
                    isSelected={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  />
                )}
              />
            </View>
          )}


          <LabeledTextField
            fieldType={{ kind: 'text' }}
            label="Name"
            value={name}
            onValueChange={setName}
            placeHolder="Give this transaction a name.."
          />

          <LabeledTextField
            fieldType={{ kind: 'date' }}
            label="Date"
            value={date}
            onValueChange={setDate}
            placeHolder="Enter the date of transaction.."
          />

          {selectedType === ActivityType.Expense && (
            <LabeledTextField
              fieldType={{ kind: 'options', options: ALL_PAYMENT_METHODS }}
              label="Payment Method"
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              placeHolder="Your payment method.."
            />
          )}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={onBack}
            activeOpacity={0.85}
          >
            <Text style={styles.submitButtonText}>
              Add {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scroll: {
    flex: 1,
  },
  container: {
    padding: 20,
    gap: 20,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  typeButton: {
    flex: 1,
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    gap: 20,
  },
  categorySection: {
    gap: 5,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  submitButton: {
    marginTop: 10,
    height: 56,
    borderRadius: 15,
    backgroundColor: Palette.EmeraldGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});