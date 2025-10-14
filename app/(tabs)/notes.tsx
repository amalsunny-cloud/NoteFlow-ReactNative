import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import { auth, db } from "../../config/firebase";
import Toast from "react-native-toast-message";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: any;
}

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.currentUser) return;
    const notesRef = collection(db, "users", auth.currentUser.uid, "notes");
    const q = query(notesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData: Note[] = [];
      snapshot.forEach((doc) => {
        notesData.push({ id: doc.id, ...doc.data() } as Note);
      });
      setNotes(notesData);
    });

    return unsubscribe;
  }, []);


  // Adding Notes
  const addNote = async () => {
    if (!title.trim() || !content.trim()) {
      Toast.show({
      type: 'error',
      text1: 'Please enter both title and content',
      position: 'top',
    });
      
      return;
    }
    if (!auth.currentUser) {
      Toast.show({
      type: 'error',
      text1: 'You must be logged in to create notes',
      position: 'top',
    });
      return;
    }

    try {
      const notesRef = collection(db, "users", auth.currentUser.uid, "notes");
      await addDoc(notesRef, {
        title: title.trim(),
        content: content.trim(),
        createdAt: Timestamp.now(),
      });

      Toast.show({
        type: "success",
        text1: "Note added successfully!",
        position: "top",
      });

      setTitle("");
      setContent("");
    } catch (error) {
      console.log("Error adding note:", error);
      Toast.show({
      type: 'error',
      text1: 'Failed to add note',
      position: 'top',
    });
    }
  };

    // For deleting notes
  const deleteNote = async (noteId: string) => {
    if (!auth.currentUser) return;
    try {
      const noteRef = doc(db, "users", auth.currentUser.uid, "notes", noteId);
      await deleteDoc(noteRef);
      console.log("Deleted note successfully");
      Toast.show({
        type: "success",
        text1: "Note deleted successfully!",
        position: "top",
      });
    } catch (error) {
      console.log("Error deleting note:", error);
      Toast.show({
      type: 'error',
      text1: 'Failed to delete note',
      position: 'top',
    });
    }
  };

  const startEditNote = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingNoteId(note.id);
  };

  const cancelEdit = () => {
    setTitle("");
    setContent("");
    setEditingNoteId(null);
  };

  // For saving editing notes
  const saveEditNote = async () => {
    if (!title.trim() || !content.trim() || !editingNoteId) {
      Toast.show({
      type: 'error',
      text1: 'Please enter both title and content',
      position: 'top',
    });
      return;
    }
    if (!auth.currentUser) return;

    try {
      const editNoteRef = doc(
        db,
        "users",
        auth.currentUser.uid,
        "notes",
        editingNoteId
      );
      await updateDoc(editNoteRef, {
        title: title.trim(),
        content: content.trim(),
        updatedAt: Timestamp.now(),
      });


      Toast.show({
        type: "success",
        text1: "Note updated successfully!",
        position: "top",
      });

      setTitle("");
      setContent("");
      setEditingNoteId(null);

    } catch (error) {
      console.log("Error editing note:", error);
      Toast.show({
      type: 'error',
      text1: 'Failed to update note',
      position: 'top',
    });
    }
  };

  
  return (
    <View style={styles.container}>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={
          <View>
            <Text style={styles.header}>My Notes</Text>

            {/* Add Note Form */}
            <View style={styles.inputContainer}>
              <Text style={styles.formTitle}>
                {editingNoteId ? "Edit Note" : "Add New Note"}
              </Text>

              <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholderTextColor="#999"
              />
              <TextInput
                placeholder="Content"
                value={content}
                onChangeText={setContent}
                multiline
                style={[styles.input, styles.textArea]}
                placeholderTextColor="#999"
              />

              <View style={styles.buttonRow}>
                {editingNoteId ? (
                  <>
                    <TouchableOpacity
                      style={[styles.button, styles.saveButton]}
                      onPress={saveEditNote}
                    >
                      <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, styles.cancelButton]}
                      onPress={cancelEdit}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={[styles.button, styles.addButton]}
                    onPress={addNote}
                  >
                    <Text style={styles.buttonText}>Add Note</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDate}>
                {item.createdAt?.toDate()?.toLocaleDateString()}
              </Text>
            </View>

            <Text style={styles.cardContent}>{item.content}</Text>

            <View style={styles.cardActions}>
              <TouchableOpacity
                onPress={() => startEditNote(item)}
                style={styles.editButton}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteNote(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6fc", padding: 20 },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  inputContainer: { marginBottom: 20 },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e0e4ec",
  },
  textArea: { minHeight: 80, textAlignVertical: "top" },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },
  addButton: { backgroundColor: "#3498db" },
  saveButton: { backgroundColor: "#27ae60" },
  cancelButton: { backgroundColor: "#95a5a6" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#2c3e50" },
  cardDate: { fontSize: 12, color: "#999" },
  cardContent: { fontSize: 16, color: "#34495e", marginBottom: 10 },
  cardActions: { flexDirection: "row", justifyContent: "flex-end" },
  deleteButton: { paddingVertical: 5, paddingHorizontal: 10, marginLeft: 10 },
  deleteButtonText: { color: "#e74c3c", fontWeight: "bold" },
  editButton: { paddingVertical: 5, paddingHorizontal: 10 },
  editButtonText: { color: "#f39c12", fontWeight: "bold" },
});