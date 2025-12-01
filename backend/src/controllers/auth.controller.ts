import { Request, Response } from 'express';

import { UserModel } from '../models/User';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken, setRefreshTokenCookie, clearRefreshTokenCookie, verifyRefreshToken } from '../utils/tokens';


export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const existing = await UserModel.findOne({ email });
  if (existing) return res.status(409).json({ error: 'Email already registered' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ email, passwordHash });
  const accessToken = generateAccessToken({ userId: user._id, email: user.email });
  const refreshToken = generateRefreshToken({ userId: user._id, email: user.email });
  setRefreshTokenCookie(res, refreshToken);
  res.status(201).json({ token: accessToken, user: { id: user._id, email: user.email } });
}


export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const accessToken = generateAccessToken({ userId: user._id, email: user.email });
  const refreshToken = generateRefreshToken({ userId: user._id, email: user.email });
  setRefreshTokenCookie(res, refreshToken);
  res.json({ token: accessToken, user: { id: user._id, email: user.email } });
}

// Refresh access token using refresh token cookie
export async function refreshToken(req: Request, res: Response) {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ error: 'No refresh token' });
  try {
    const payload = verifyRefreshToken(token) as any;
    const user = await UserModel.findById(payload.userId);
    if (!user) return res.status(401).json({ error: 'User not found' });
    const accessToken = generateAccessToken({ userId: user._id, email: user.email });
    res.json({ token: accessToken, user: { id: user._id, email: user.email } });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
}

// Logout: clear refresh token cookie
export function logout(req: Request, res: Response) {
  clearRefreshTokenCookie(res);
  res.json({ success: true });
}
