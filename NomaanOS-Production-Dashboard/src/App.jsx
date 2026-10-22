import React, { useState, useEffect } from 'react';
import { Plus, Clock, DollarSign, MessageSquare, CheckSquare, Play, Pause, Trash2, Edit3, Save, X, Settings, User, LogOut, BarChart3, Brain, Zap } from 'lucide-react';

const Dashboard = () => {
  // State Management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [sessionStart, setSessionStart] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const formatCurrency = (value) => `���${Number(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

  const buildOfflineAiResponse = (prompt) => {
    const taskCount = tasks.length;
    const completedCount = tasks.filter((task) => task.completed).length;
    const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
    const todayTime = timeEntries
      .filter((entry) => entry.date === new Date().toISOString().split('T')[0])
      .reduce((sum, entry) => sum + Number(entry.duration || 0), 0);

    const lowerPrompt = (prompt || '').toLowerCase();
    const taskStatus = taskCount === 0 ? 'No active tasks yet.' : `${completedCount}/${taskCount} tasks completed.`;

    if (lowerPrompt.includes('productivity')) {
      return `Here are 3 practical productivity actions for today:\n1. Focus on the 2 highest-priority tasks first and block a 60-minute deep-work session.\n2. Keep your task list below 5 active items so execution stays clear and achievable.\n3. Review your spending and time logs before the day ends to identify what should be reduced or automated.\n\nCurrent status: ${taskStatus} ${todayTime > 0 ? `You have logged ${Math.floor(todayTime / 60)} minutes today.` : 'You have not tracked time yet.'}`;
    }

    if (lowerPrompt.includes('spend') || lowerPrompt.includes('expense')) {
      return `Expense review summary:\n- Total recorded spend: ${formatCurrency(totalExpenses)}\n- Current task load: ${taskCount} active tasks\n- Recommended action: cut non-essential spending and keep category-based tracking consistent.\n\nIf your spend is climbing, review recurring costs first, then reduce optional items before the end of the week.`;
    }

    if (lowerPrompt.includes('schedule') || lowerPrompt.includes('time')) {
      return `Suggested time plan for today:\n1. 30 minutes for planning and priority sorting.\n2. 90 minutes of focused execution on your top 2 tasks.\n3. 30 minutes for admin tasks, approvals, and quick follow-ups.\n4. 15 minutes for review, communication, and cleanup.\n\nCurrent time tracked today: ${formatTime(todayTime)}.`;
    }

    if (lowerPrompt.includes('email') || lowerPrompt.includes('follow up')) {
      return `Subject: Follow-up on Application\n\nDear Hiring Manager,\n\nThank you for taking the time to review my application. I am very interested in the opportunity and would welcome the chance to discuss how my background and current work align with the role.\n\nI would appreciate the opportunity to speak further and am happy to provide any additional information.\n\nKind regards,\n[Your Name]`;
    }

    return `Here is a professional operational summary:\n- ${taskStatus}\n- Total spend so far: ${formatCurrency(totalExpenses)}\n- Time logged today: ${formatTime(todayTime)}\n- Recommendation: keep your work focused on the highest-value tasks and reduce distractions by batching admin work into a single review block.`;
  };

  // Load authentication state
  useEffect(() => {
    const authState = localStorage.getItem('nomaanos-auth');
    const sessionData = localStorage.getItem('nomaanos-session');

    if (authState === 'true' && sessionData) {
      const session = JSON.parse(sessionData);
      const now = Date.now();

      if (now - session.start < 3600000) {
        setIsAuthenticated(true);
        setSessionStart(session.start);
        setMessageCount(session.messageCount || 0);
      } else {
        localStorage.removeItem('nomaanos-auth');
        localStorage.removeItem('nomaanos-session');
      }
    }
  }, []);

  // Load data from localStorage on mount
  useEffect(() => {
    if (isAuthenticated) {
      const savedTasks = localStorage.getItem('nomaanos-tasks');
      const savedExpenses = localStorage.getItem('nomaanos-expenses');
      const savedTimeEntries = localStorage.getItem('nomaanos-time-entries');

      if (savedTasks) setTasks(JSON.parse(savedTasks));
      if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
      if (savedTimeEntries) setTimeEntries(JSON.parse(savedTimeEntries));
    }
  }, [isAuthenticated]);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('nomaanos-tasks', JSON.stringify(tasks));
    }
  }, [tasks, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('nomaanos-expenses', JSON.stringify(expenses));
    }
  }, [expenses, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('nomaanos-time-entries', JSON.stringify(timeEntries));
    }
  }, [timeEntries, isAuthenticated]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (currentTimer) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentTimer]);

  // Session management
  useEffect(() => {
    if (isAuthenticated && sessionStart) {
      const sessionData = {
        start: sessionStart,
        messageCount: messageCount,
      };
      localStorage.setItem('nomaanos-session', JSON.stringify(sessionData));
    }
  }, [messageCount, sessionStart, isAuthenticated]);

  // Authentication
  const handleLogin = () => {
    if (loginForm.username === 'admin' && loginForm.password === 'nomaanos123') {
      setIsAuthenticated(true);
      const now = Date.now();
      setSessionStart(now);
      setMessageCount(0);
      localStorage.setItem('nomaanos-auth', 'true');
      localStorage.setItem('nomaanos-session', JSON.stringify({ start: now, messageCount: 0 }));
    } else {
      alert('Invalid credentials. Contact NomaanOS for access.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nomaanos-auth');
    localStorage.removeItem('nomaanos-session');
    setSessionStart(null);
    setMessageCount(0);
  };

  // Format time helper
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Task Management
  const addTask = () => {
    const title = prompt('Enter task title:');
    if (title) {
      const newTask = {
        id: Date.now(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Expense Management
  const addExpense = () => {
    const amount = prompt('Enter amount:');
    const description = prompt('Enter description:');
    const category = prompt('Enter category (food, transport, shopping, etc.):');

    if (amount && description && category) {
      const newExpense = {
        id: Date.now(),
        amount: parseFloat(amount),
        description,
        category,
        date: new Date().toISOString().split('T')[0],
      };
      setExpenses([...expenses, newExpense]);
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Time Tracking
  const startTimer = () => {
    const project = prompt('Enter project/task name:');
    if (project) {
      setCurrentTimer({
        id: Date.now(),
        project,
        startTime: Date.now(),
      });
      setTimerSeconds(0);
    }
  };

  const stopTimer = () => {
    if (currentTimer) {
      const timeEntry = {
        id: currentTimer.id,
        project: currentTimer.project,
        duration: timerSeconds,
        date: new Date().toISOString().split('T')[0],
      };
      setTimeEntries([...timeEntries, timeEntry]);
      setCurrentTimer(null);
      setTimerSeconds(0);
    }
  };

  // AI Assistant
  const getAiSuggestion = async (prompt) => {
    if (messageCount >= 20) {
      setAiResponse('Message limit reached (20/session). Contact NomaanOS for Enterprise Access with unlimited usage.');
      return;
    }

    setIsAiLoading(true);
    setMessageCount((prev) => prev + 1);

    try {
      const reply = buildOfflineAiResponse(prompt);
      setTimeout(() => {
        setAiResponse(reply);
        setIsAiLoading(false);
      }, 500);
    } catch (error) {
      setAiResponse('AI service is temporarily unavailable. The app has switched to a local operational mode to keep the dashboard usable.');
      setIsAiLoading(false);
    }
  };

  // Calculate stats
  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
  const totalTimeToday = timeEntries
    .filter((entry) => entry.date === new Date().toISOString().split('T')[0])
    .reduce((sum, entry) => sum + Number(entry.duration || 0), 0);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const sessionTime = sessionStart ? Math.floor((Date.now() - sessionStart) / 1000 / 60) : 0;

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-md border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">NomaanOS AI Assistant</h1>
            <p className="text-gray-300">Private Access Only</p>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Access Dashboard
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>Authorized personnel only</p>
            <p className="mt-2">Contact NomaanOS for Enterprise Access</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">NomaanOS AI Dashboard</h1>
                <p className="text-sm text-gray-300">Professional AI Assistant</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-300">
                Session: {sessionTime}min | Messages: {messageCount}/20
              </div>
              <button
                onClick={() => setShowAdmin(!showAdmin)}
                className="p-2 text-gray-300 hover:text-white transition-colors"
                title="Admin Panel"
              >
                <BarChart3 className="h-5 w-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Panel */}
        {showAdmin && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Admin Analytics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-500/20 rounded-lg p-4">
                <div className="text-blue-300 text-sm">Total Messages</div>
                <div className="text-2xl font-bold text-white">{messageCount}</div>
              </div>
              <div className="bg-green-500/20 rounded-lg p-4">
                <div className="text-green-300 text-sm">Session Time</div>
                <div className="text-2xl font-bold text-white">{sessionTime}min</div>
              </div>
              <div className="bg-purple-500/20 rounded-lg p-4">
                <div className="text-purple-300 text-sm">Tasks Completed</div>
                <div className="text-2xl font-bold text-white">{completedTasks}</div>
              </div>
              <div className="bg-orange-500/20 rounded-lg p-4">
                <div className="text-orange-300 text-sm">Total Expenses</div>
                <div className="text-2xl font-bold text-white">{formatCurrency(totalExpenses)}</div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <CheckSquare className="h-8 w-8 text-blue-400" />
              <div className="ml-4">
                <p className="text-sm text-gray-300">Total Tasks</p>
                <p className="text-2xl font-bold text-white">{tasks.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-400" />
              <div className="ml-4">
                <p className="text-sm text-gray-300">Total Expenses</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalExpenses)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-400" />
              <div className="ml-4">
                <p className="text-sm text-gray-300">Today's Time</p>
                <p className="text-2xl font-bold text-white">{formatTime(totalTimeToday)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-orange-400" />
              <div className="ml-4">
                <p className="text-sm text-gray-300">AI Messages</p>
                <p className="text-2xl font-bold text-white">{messageCount}/20</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
          {/* Tab Navigation */}
          <div className="flex border-b border-white/20">
            {['tasks', 'expenses', 'time', 'ai-assistant'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Tasks Tab */}
            {activeTab === 'tasks' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Task Manager</h2>
                  <button
                    onClick={addTask}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </button>
                </div>

                <div className="space-y-3">
                  {tasks.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No tasks yet. Add your first task!</p>
                  ) : (
                    tasks.map((task) => (
                      <div key={task.id} className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                        task.completed
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className={task.completed ? 'line-through text-gray-400' : 'text-white'}>
                            {task.title}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Expenses Tab */}
            {activeTab === 'expenses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Expense Tracker</h2>
                  <button
                    onClick={addExpense}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Expense
                  </button>
                </div>

                <div className="space-y-3">
                  {expenses.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No expenses recorded yet.</p>
                  ) : (
                    expenses.map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg transition-all">
                        <div>
                          <div className="font-semibold text-white">{formatCurrency(expense.amount)}</div>
                          <div className="text-sm text-gray-300">{expense.description}</div>
                          <div className="text-xs text-gray-400">{expense.category} • {expense.date}</div>
                        </div>
                        <button
                          onClick={() => deleteExpense(expense.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Time Tracking Tab */}
            {activeTab === 'time' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Time Tracker</h2>
                  {!currentTimer ? (
                    <button
                      onClick={startTimer}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Timer
                    </button>
                  ) : (
                    <button
                      onClick={stopTimer}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Stop Timer
                    </button>
                  )}
                </div>

                {currentTimer && (
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-mono font-bold text-purple-300">
                        {formatTime(timerSeconds)}
                      </div>
                      <div className="text-purple-200 mt-2">{currentTimer.project}</div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {timeEntries.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No time entries yet.</p>
                  ) : (
                    timeEntries.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg transition-all">
                        <div>
                          <div className="font-semibold text-white">{entry.project}</div>
                          <div className="text-sm text-gray-300">Duration: {formatTime(entry.duration)}</div>
                          <div className="text-xs text-gray-400">{entry.date}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* AI Assistant Tab */}
            {activeTab === 'ai-assistant' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
                  <div className="text-sm text-gray-300">
                    Messages remaining: {20 - messageCount}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => getAiSuggestion('Based on my current tasks, suggest 3 productivity improvements I can make today.')}
                    className="p-4 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 rounded-lg text-left transition-all"
                    disabled={messageCount >= 20}
                  >
                    <div className="font-semibold text-blue-300">Productivity Tips</div>
                    <div className="text-sm text-blue-200">Get AI suggestions for better productivity</div>
                  </button>

                  <button
                    onClick={() => getAiSuggestion('Analyze my spending patterns and give me 3 money-saving tips.')}
                    className="p-4 bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 rounded-lg text-left transition-all"
                    disabled={messageCount >= 20}
                  >
                    <div className="font-semibold text-green-300">Expense Analysis</div>
                    <div className="text-sm text-green-200">AI insights on your spending</div>
                  </button>

                  <button
                    onClick={() => getAiSuggestion('Create a daily schedule that optimizes my time and energy levels.')}
                    className="p-4 bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 rounded-lg text-left transition-all"
                    disabled={messageCount >= 20}
                  >
                    <div className="font-semibold text-purple-300">Schedule Optimizer</div>
                    <div className="text-sm text-purple-200">AI-powered time management</div>
                  </button>

                  <button
                    onClick={() => getAiSuggestion('Write a professional email template for following up on a job application.')}
                    className="p-4 bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 rounded-lg text-left transition-all"
                    disabled={messageCount >= 20}
                  >
                    <div className="font-semibold text-orange-300">Email Composer</div>
                    <div className="text-sm text-orange-200">AI-assisted email writing</div>
                  </button>
                </div>

                {messageCount >= 20 && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                    <div className="text-red-300 font-semibold">Message Limit Reached</div>
                    <div className="text-red-200 text-sm">Contact NomaanOS for Enterprise Access with unlimited AI interactions</div>
                  </div>
                )}

                {isAiLoading && (
                  <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center text-gray-300">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400 mr-3"></div>
                      <span>NomaanOS AI is processing...</span>
                    </div>
                  </div>
                )}

                {aiResponse && (
                  <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-white">AI Response:</h3>
                    <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">{aiResponse}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>NomaanOS Professional AI Dashboard</p>
          <p className="mt-1">Contact NomaanOS for Enterprise Access & Custom Solutions</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
