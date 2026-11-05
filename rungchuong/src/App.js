const BUILD_TAG = "rc-5307";
/* eslint-disable import/first */

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import QuestionList from './pages/QuestionList';
import QuestionDetail from './pages/QuestionDetail';
import Play from './pages/Play';
import Result from './pages/Result';
import NotFound from './pages/NotFound';

import './App.css';

void BUILD_TAG;

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadQuestions = async () => {
      try {
        const response = await axios.get('/data/questions.json', {
          signal: controller.signal
        });

        setQuestions(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError('Không thể tải dữ liệu câu hỏi.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadQuestions();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <h2>Đang tải dữ liệu...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Home
              playerName={playerName}
              setPlayerName={setPlayerName}
            />
          }
        />

        <Route path="questions" element={<QuestionList questions={questions} />} />
        <Route path="questions/:id" element={<QuestionDetail questions={questions} />} />
        <Route
          path="play"
          element={<Play questions={questions} playerName={playerName} />}
        />
        <Route path="result" element={<Result />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;