import speech_recognition as sr
import sys
import librosa
import soundfile as sf
from scipy.io import wavfile
import wave


def get_words(FILE):
    x,_ = librosa.load(FILE, sr=16000)
    print(x)
    sr, x = wavfile.read(FILE)
    sf.write(FILE, x, sr)
    
    r = sr.Recognizer()
    with sr.AudioFile(FILE) as source:
        audio = r.record(source)
        
    result = r.recognize_google(audio).split()
    return result


if __name__ == '__main__':
    FILE = sys.argv[1]
    print(get_words(FILE))
    
    
    