import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native'
import * as Clipboard from 'expo-clipboard'

import { Heading } from '../Heading';

import { styles } from './styles';
import { THEME } from '../../theme';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopying, setIsCopying] = useState(false)

  async function handleCopyDiscordToClipboard() {
    setIsCopying(true)
    await Clipboard.setStringAsync(discord)
    Alert.alert(
      'Discord copiado!',
      'Cole o usuário na pesquisa do Discord para entrar em contato.'
    )
    setIsCopying(false)
  }

  return (
    <Modal
      animationType='fade'
      transparent
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.closeModalIcon}
            onPress={onClose}
          >
            <MaterialIcons
              name='close'
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />
          <Heading
            title="Let's play!"
            subtitle='Agora é só começar a jogar!'
            style={{ alignItems: 'center', marginTop: 24 }}
          />
          <Text style={styles.label}>
            Adicione no Discord
          </Text>
          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopying}
          >
            <Text style={styles.discord}>
              {
                isCopying ?
                  <ActivityIndicator
                    color={THEME.COLORS.PRIMARY}
                  /> :
                  discord
              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}