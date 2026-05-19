import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Card } from '../../engine/types';
import CardView from './CardView';
import { colors } from '../../constants/colors';

interface CardHandProps {
  cards: Card[];
  faceUp?: boolean;
  interactive?: boolean;
  onCardSelect?: (cardId: string) => void;
  selectedCardId?: string | null;
  label?: string;
}

export default function CardHand({
  cards,
  faceUp = true,
  interactive = false,
  onCardSelect,
  selectedCardId,
  label,
}: CardHandProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <FlatList
        horizontal
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <CardView
              value={item.value}
              faceUp={faceUp}
              selected={selectedCardId === item.id}
              onPress={interactive && onCardSelect ? () => onCardSelect(item.id) : undefined}
              disabled={!interactive}
            />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
      <Text style={styles.count}>{cards.length}枚</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  list: {
    paddingHorizontal: 8,
    gap: 4,
  },
  cardWrapper: {
    marginHorizontal: 2,
  },
  count: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },
});
