import React, { useState } from "react";
import { Alert, Text, View, TextInput, Pressable, TouchableOpacity, ScrollView } from "react-native";

const TodoList = () => {
  const [title, setTitle] = useState<string>(''); // State untuk menyimpan input dari TextInput
  const [todoList, setTodoList] = useState<any[]>([
    {
      id: 1,
      title: 'Todo 1',
      completed: false,
    },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null); // State untuk melacak item todo yang sedang diedit
  const [editingText, setEditingText] = useState<string>(''); // State untuk menyimpan teks yang sedang diedit

  // Fungsi untuk menambahkan todo baru
  const handleAddTodo = () => {
    if (!title) {
      Alert.alert('Error', 'Masukkan todo Anda'); // Menampilkan pesan error jika input kosong
      return;
    }

    const newTodo = {
      id: todoList.length + 1,
      title: title,
      completed: false,
    };
    setTodoList([...todoList, newTodo]); // Tambahkan todo baru ke daftar
    setTitle(''); // Mengosongkan input setelah menambah todo
  };

  // Fungsi untuk menyimpan edit item todo
  const handleSaveEdit = (id: number) => {
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, title: editingText } : todo // Update todo yang sedang diedit
    );
    setTodoList(updatedTodos); // Memperbarui daftar todo dengan perubahan
    setEditingId(null); // Reset editingId setelah selesai mengedit
  };

  // Fungsi untuk memulai proses edit
  const handleEditTodo = (id: number, currentTitle: string) => {
    setEditingId(id); // Set ID todo yang sedang diedit
    setEditingText(currentTitle); // Isi editingText dengan judul todo yang dipilih untuk diedit
  };

  // Fungsi untuk menghapus todo
  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todoList.filter((todo) => todo.id !== id); // Hapus todo dari daftar
    setTodoList(updatedTodos); // Memperbarui daftar todo tanpa item yang dihapus
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#f0f0f0',
      }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
        Daftar Todo
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <TextInput
          placeholder="Masukkan Todo"
          style={{
            flex: 1,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            backgroundColor: '#fff',
          }}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Pressable
          style={{
            backgroundColor: 'blue',
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginLeft: 10,
          }}
          onPress={handleAddTodo}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}>
            Tambah
          </Text>
        </Pressable>
      </View>

      <ScrollView>
        {todoList.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff',
              padding: 15,
              borderRadius: 8,
              marginBottom: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3,
            }}>
            {editingId === item.id ? (
              // Jika sedang mengedit, tampilkan TextInput
              <TextInput
                style={{
                  flex: 1,
                  borderColor: '#ccc',
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: '#fff',
                }}
                value={editingText}
                onChangeText={(text) => setEditingText(text)}
              />
            ) : (
              // Jika tidak mengedit, tampilkan teks todo
              <Text
                style={{
                  fontSize: 18,
                  color: '#333',
                  flex: 1,
                }}>
                {item.title}
              </Text>
            )}

            {editingId === item.id ? (
              // Tombol Simpan jika sedang mengedit
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 5,
                  marginRight: 5,
                }}
                onPress={() => handleSaveEdit(item.id)}>
                <Text style={{ color: 'white' }}>Simpan</Text>
              </TouchableOpacity>
            ) : (
              // Tombol Edit jika tidak sedang mengedit
              <TouchableOpacity
                style={{
                  backgroundColor: 'orange',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 5,
                  marginRight: 5,
                }}
                onPress={() => handleEditTodo(item.id, item.title)}>
                <Text style={{ color: 'white' }}>Edit</Text>
              </TouchableOpacity>
            )}

            {/* Tombol Delete */}
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 5,
              }}
              onPress={() => handleDeleteTodo(item.id)}>
              <Text style={{ color: 'white' }}>Hapus</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TodoList;
