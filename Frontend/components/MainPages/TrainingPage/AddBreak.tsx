import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AddBreakProps {
  visible: boolean;
  onClose: () => void;
  onAddBreak: (minutes: number, seconds: number) => void;
}

export function AddBreak({ visible, onClose, onAddBreak }: AddBreakProps) {
  const [minutes, setMinutes] = useState('3');
  const [seconds, setSeconds] = useState('30');

  const handleNumberChange = (text: string, setter: (val: string) => void) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setter(cleaned);
  };

  const handleConfirm = () => {
    const mins = parseInt(minutes) || 0;
    const secs = parseInt(seconds) || 0;
    onAddBreak(mins, secs);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              
              <View style={styles.headerRow}>
                <Text style={styles.modalTitle}>NEW BREAK</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Ionicons name="close" size={24} color="#ffffff" />
                </TouchableOpacity>
              </View>

              <View style={styles.timeSelectorContainer}>
                
                <View style={styles.inputGroup}>
                  <View style={styles.numberBox}>
                    <TextInput
                      style={styles.timeInput}
                      keyboardType="number-pad"
                      maxLength={2}
                      value={minutes}
                      onChangeText={(text) => handleNumberChange(text, setMinutes)}
                    />
                  </View>
                  <Text style={styles.unitText}>MINUTES</Text>
                </View>

                <View style={styles.inputGroup}>
                  <View style={styles.numberBox}>
                    <TextInput
                      style={styles.timeInput}
                      keyboardType="number-pad"
                      maxLength={2}
                      value={seconds}
                      onChangeText={(text) => handleNumberChange(text, setSeconds)}
                    />
                  </View>
                  <Text style={styles.unitText}>SECONDS</Text>
                </View>

              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleConfirm}>
                <Ionicons name="add" size={24} color="#000000" />
                <Text style={styles.submitButtonText}>ADD BREAK</Text>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 40
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D241E',
    fontFamily: 'System',
  },
  closeButton: {
    backgroundColor: '#d33215',
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeSelectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#FDEFD4',
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  numberBox: {
    backgroundColor: '#222222',
    width: 46,
    height: 46,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeInput: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    padding: 0,
  },
  unitText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D241E',
  },
  submitButton: {
    backgroundColor: '#FFB000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    height: 54,
    borderRadius: 12,
    gap: 6,
  },
  submitButtonText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});