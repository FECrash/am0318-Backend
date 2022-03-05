import initFirebase from '../config';
import 'firebase/compat/firestore';
import { generateId } from '../utils';

const firestore = initFirebase.firestore();

export const addAward = async (req, res) => {
  try {
    const { userId, imageData, template } = req.body;
    const awardId = generateId();
    const data = {
      reciver: userId,
      imageData,
      creation: `${new Date()}`,
      template,
    };
    const reciver = await firestore.collection('am0318-award').doc(userId);
    const currentData = await reciver.get().data();
    currentData.awards.unshift(data);
    await reciver.set(currentData);
    await firestore.collection('am0318-award').doc(awardId).set(data);
    res.status(200).json({ data });
  } catch (error) {
    res.status(403).send(error.message);
  }
};

export const getAllAwards = async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await firestore.collection('am0318-user').doc(userId).get();
    if (users.empty) {
      res.status(404).send('No student record found');
    } else {
      res.status(200).json({ data: users.awards });
    }
  } catch (error) {
    res.status(403).send(error.message);
  }
};

export const getDetailAward = async (req, res) => {
  try {
    const { awardId } = req.params;
    const data = await firestore.collection('am0318-user').doc(awardId).get();
    if (!data.exists) {
      res.status(404).send('Student with the given ID not found');
    } else {
      res.status(200).json({ data: data.data() });
    }
  } catch (error) {
    res.status(403).send(error.message);
  }
};
