import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function ensureDataFile() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR);
  }
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, JSON.stringify([]));
  }
}

export async function GET() {
  try {
    await ensureDataFile();
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await ensureDataFile();
    const newLead = await req.json();
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    const leads = JSON.parse(data);
    
    // Add timestamp and ID
    const leadWithMeta = {
      ...newLead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "Pendente"
    };
    
    leads.push(leadWithMeta);
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
    
    return NextResponse.json(leadWithMeta, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    let leads = JSON.parse(data);
    leads = leads.filter((l: any) => l.id !== id);
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
