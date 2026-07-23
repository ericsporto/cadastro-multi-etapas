import { describe, it, expect, vi, beforeEach } from 'vitest';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { exportToPDF } from '../exportToPDF';

const mockAddImage = vi.fn();
const mockSave = vi.fn();

vi.mock('jspdf', () => {
  const MockJsPDF = vi.fn().mockImplementation(function (this: any) {
    this.addImage = mockAddImage;
    this.save = mockSave;
    return this;
  });

  return {
    default: MockJsPDF,
    jsPDF: MockJsPDF,
  };
});

vi.mock('html2canvas');

describe('exportToPDF Utility', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    document.body.innerHTML = '';

    vi.mocked(html2canvas).mockResolvedValue({
      height: 1000,
      width: 500,
      toDataURL: vi.fn().mockReturnValue('data:image/png;base64,fake-img-data'),
    } as unknown as HTMLCanvasElement);
  });

  it('should exit early if element with id "summary-content" is not found in DOM', async () => {
    await exportToPDF();

    expect(html2canvas).not.toHaveBeenCalled();
    expect(jsPDF).not.toHaveBeenCalled();
  });

  it('should capture DOM element, generate canvas and save PDF when element exists', async () => {
    const dummyElement = document.createElement('div');
    dummyElement.id = 'summary-content';
    document.body.appendChild(dummyElement);

    await exportToPDF();

    expect(html2canvas).toHaveBeenCalledWith(dummyElement, {
      scale: 2,
      backgroundColor: '#ffffff',
    });

    expect(jsPDF).toHaveBeenCalledWith('p', 'mm', 'a4');

    expect(mockAddImage).toHaveBeenCalledWith(
      'data:image/png;base64,fake-img-data',
      'PNG',
      10,
      10,
      190,
      380
    );

    expect(mockSave).toHaveBeenCalledWith(
      expect.stringMatching(/^resumo-cadastro-\d+\.pdf$/)
    );
  });
});
