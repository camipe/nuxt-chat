import type { Chat, ChatMessage } from '../types';
import { MOCK_CHAT } from './mockData';

export default function useChat() {
  const chat = ref<Chat>(MOCK_CHAT);
  const messages = computed<ChatMessage[]>(
    () => chat.value?.messages || [],
  );

  function createMessage(
    message: string,
    role: ChatMessage['role'],
  ) {
    const id = messages.value.length.toString();

    return {
      id,
      role,
      content: message,
    } as ChatMessage;
  }

  function sendMessage(message: string) {
    messages.value.push(createMessage(message, 'user'));

    setTimeout(() => {
      const response = `This is a mock response to: "${message}"`;
      messages.value.push(createMessage(response, 'assistant'));
    });
  }

  return {
    chat,
    messages,
    sendMessage,
  };
}
