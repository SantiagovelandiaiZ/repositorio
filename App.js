import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  Pressable,
  FlatList,
  StatusBar,
  Alert,
} from 'react-native';

const TAREAS_INICIALES = [
  {
    id: '1',
    titulo: 'Estudiar React Native',
    prioridad: 'Alta',
    urgente: true,
    completada: false,
  },
  {
    id: '2',
    titulo: 'Comprar víveres',
    prioridad: 'Baja',
    urgente: false,
    completada: true,
  },
];

export default function App() {
  const [tareas, setTareas] = useState(TAREAS_INICIALES);
  const [titulo, setTitulo] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [urgente, setUrgente] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  const agregarTarea = () => {
    if (!titulo.trim() || !prioridad.trim()) {
      Alert.alert('Faltan datos', 'Escribe una descripción y una prioridad.');
      return;
    }

    const nueva = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      prioridad: prioridad.trim(),
      urgente,
      completada: false,
    };

    setTareas((anteriores) => [nueva, ...anteriores]);
    setTitulo('');
    setPrioridad('');
    setUrgente(false);
  };

  const alternarCompletada = (id) => {
    setTareas((anteriores) =>
      anteriores.map((item) =>
        item.id === id ? { ...item, completada: !item.completada } : item
      )
    );
  };

  const eliminarTarea = (id) => {
    Alert.alert('Eliminar tarea', '¿Quieres eliminar esta tarea?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => setTareas((anteriores) => anteriores.filter((item) => item.id !== id)),
      },
    ]);
  };

  const tareasFiltradas = tareas.filter((item) =>
    item.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={[styles.card, item.completada && styles.cardCompletada]}>
      <View style={styles.taskInfo}>
        <Text style={[styles.taskTitle, item.completada && styles.textTachado]}>
          {item.titulo}
        </Text>
        <Text style={styles.taskSub}>Prioridad: {item.prioridad}</Text>
      </View>

      <View style={styles.actions}>
        <Text style={[styles.badge, item.urgente ? styles.urgente : styles.normal]}>
          {item.urgente ? 'Urgente' : 'Normal'}
        </Text>
        <Pressable
          accessibilityRole="button"
          style={styles.checkBtn}
          onPress={() => alternarCompletada(item.id)}
        >
          <Text style={styles.btnText}>{item.completada ? 'Deshacer' : 'Listo'}</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          style={styles.deleteBtn}
          onPress={() => eliminarTarea(item.id)}
        >
          <Text style={styles.btnText}>X</Text>
        </Pressable>
      </View>
    </View>
  );

  const Header = () => (
    <View>
      <Text style={styles.headerTitle}>Gestor de Tareas</Text>
      <Text style={styles.description}>Organiza tus pendientes de forma sencilla.</Text>

      <TextInput
        style={styles.inputSearch}
        placeholder="Buscar tarea..."
        placeholderTextColor="#9a3412"
        value={busqueda}
        onChangeText={setBusqueda}
        accessibilityLabel="Buscar tarea"
      />

      <View style={styles.form}>
        <Text style={styles.subTitle}>Nueva tarea</Text>
        <TextInput
          style={styles.input}
          placeholder="Descripción de la tarea"
          placeholderTextColor="#9a3412"
          value={titulo}
          onChangeText={setTitulo}
          returnKeyType="next"
        />
        <TextInput
          style={styles.input}
          placeholder="Prioridad (Alta, Media, Baja)"
          placeholderTextColor="#9a3412"
          value={prioridad}
          onChangeText={setPrioridad}
        />
        <View style={styles.switchRow}>
          <Text style={styles.label}>¿Es urgente?</Text>
          <Switch value={urgente} onValueChange={setUrgente} />
        </View>
        <Pressable style={styles.addBtn} onPress={agregarTarea} accessibilityRole="button">
          <Text style={styles.addBtnText}>AGREGAR TAREA</Text>
        </Pressable>
      </View>

      <Text style={styles.subTitle}>Mis tareas ({tareasFiltradas.length})</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff7ed" />
      <FlatList
        data={tareasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={Header}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay tareas que coincidan con la búsqueda.</Text>
        }
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff7ed' },
  listContent: { padding: 20, paddingBottom: 36 },
  headerTitle: { fontSize: 27, fontWeight: 'bold', color: '#7c2d12', marginBottom: 5 },
  description: { fontSize: 14, color: '#9a3412', marginBottom: 15 },
  subTitle: { fontSize: 18, fontWeight: 'bold', color: '#9a3412', marginVertical: 10 },
  inputSearch: {
    backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1,
    borderColor: '#fdba74', marginBottom: 15, color: '#431407',
  },
  form: { backgroundColor: '#ffedd5', padding: 15, borderRadius: 10, marginBottom: 15 },
  input: {
    backgroundColor: '#fff', padding: 11, borderRadius: 6, borderWidth: 1,
    borderColor: '#fed7aa', marginBottom: 10, color: '#431407',
  },
  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10,
  },
  label: { color: '#7c2d12', fontWeight: '500' },
  addBtn: { backgroundColor: '#c2410c', padding: 13, borderRadius: 6, alignItems: 'center' },
  addBtnText: { color: '#fff', fontWeight: 'bold' },
  card: {
    flexDirection: 'row', backgroundColor: '#fff', padding: 13, borderRadius: 8,
    alignItems: 'center', borderWidth: 1, borderColor: '#fed7aa',
  },
  cardCompletada: { backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' },
  taskInfo: { flex: 1, paddingRight: 8 },
  taskTitle: { fontSize: 15, fontWeight: 'bold', color: '#431407', marginBottom: 4 },
  textTachado: { textDecorationLine: 'line-through', color: '#9ca3af' },
  taskSub: { fontSize: 12, color: '#9a3412' },
  actions: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 5 },
  badge: { paddingHorizontal: 7, paddingVertical: 5, borderRadius: 10, fontSize: 10, color: '#fff', overflow: 'hidden' },
  urgente: { backgroundColor: '#dc2626' },
  normal: { backgroundColor: '#2563eb' },
  checkBtn: { backgroundColor: '#16a34a', paddingHorizontal: 8, paddingVertical: 7, borderRadius: 4 },
  deleteBtn: { backgroundColor: '#ef4444', paddingHorizontal: 9, paddingVertical: 7, borderRadius: 4 },
  btnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  separator: { height: 10 },
  emptyText: { color: '#9a3412', textAlign: 'center', paddingVertical: 20 },
});
