const express = require('express');
const app = express();
const sequelize = require('sequelize');
const userModel = require('./models/User')
const PORT = 8000;
require('dotenv').config();

//sequelize 연결 설정
const Sequelize = new sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host:process.env.DB_HOST,
    dialect: 'mysql',
  }
);
// 모델 초기화
const User = userModel(Sequelize);

app.use(express.json());
app.get('/', (req,res)=>{
  res.send('하이');
});

app.post('/api/users', async (req, res)=>{
  try {
    const {username, email} = req.body;
    const user = await User.create({username, email});
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: '서버에러'});
    
  }
});


Sequelize.sync({force: true}).then(()=>{
  console.log('테이블생성완료');

  app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
    
  })
  
});