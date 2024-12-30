import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Importamos el AuthContext

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null); // Nueva variable de estado para la edición
  const [editedTaskTitle, setEditedTaskTitle] = useState('');
  const { token } = useAuth(); // Usamos el token de AuthContext

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (token) {
      fetchTasks();
    }
  }, [token]);

  const addTask = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/tasks',
        { title: newTask, status: 'pending' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === false ? true : false;

    try {
      const response = await axios.put(
        `http://localhost:4000/api/tasks/${id}`,
        { completed: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: response.data.completed } : task
        )
      );
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };

  const editTask = (id, title) => {
    setEditingTaskId(id);
    setEditedTaskTitle(title);
  };

  const saveEditedTask = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/tasks/${editingTaskId}`,
        { title: editedTaskTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === editingTaskId ? { ...task, title: response.data.title } : task
        )
      );
      setEditingTaskId(null);
      setEditedTaskTitle('');
    } catch (error) {
      console.error('Error saving edited task:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed === true;
    if (filter === 'pending') return task.completed === false;
    return true; // Por seguridad
  });
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Tareas</h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nueva tarea"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Agregar
        </button>
      </div>
      {/* Filtros de tareas */}
      <div className="mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 mr-4 border rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 mr-4 border rounded-md ${filter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          Completadas
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 mr-4 border rounded-md ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
        >
          Pendientes
        </button>
      </div>

      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <li
            key={task._id}
            className={`flex justify-between items-center p-4 border border-gray-200 rounded-md shadow-sm ${task.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'} transition-all duration-300 ease-in-out`}
          >
            <div className="flex items-center space-x-4">
              {editingTaskId === task._id ? (
                <input
                  type="text"
                  value={editedTaskTitle}
                  onChange={(e) => setEditedTaskTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <span className={`text-lg ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </span>
              )}
              <span className="text-sm text-gray-500">{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex space-x-2">
              {editingTaskId === task._id ? (
                <button
                  onClick={saveEditedTask}
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
                >
                  Guardar
                </button>
              ) : (
                <button
                  onClick={() => editTask(task._id, task.title)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Editar
                </button>
              )}
              <button
                onClick={() => deleteTask(task._id)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
              >
                Eliminar
              </button>
              <button
                onClick={() => toggleTaskStatus(task._id, task.completed)}
                className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
              >
                {task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;



  